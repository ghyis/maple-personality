/**
 * Maple Personality Test — result logger (no cookies)
 *
 * SETUP:
 * 1. Create a Google Sheet with headers in row 1:
 *    timestamp | mbti | result_image | page
 * 2. Extensions → Apps Script → paste this file → Save
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL (ends with /exec)
 * 5. Paste it into index.html as window.MAPLE_RESULTS_SHEET_URL
 */

var SHEET_NAME = 'Results';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var body = {};
    if (e && e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    }
    var sheet = getResultsSheet();
    var ts = body.timestamp ? new Date(body.timestamp) : new Date();
    sheet.appendRow([
      ts,
      String(body.mbti || '').toUpperCase(),
      String(body.resultImage || ''),
      String(body.page || '')
    ]);
    return jsonOk({ ok: true });
  } catch (err) {
    return jsonOk({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return jsonOk({ ok: true, message: 'Maple result logger is running. Use POST to append rows.' });
}

function getResultsSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['timestamp', 'mbti', 'result_image', 'page']);
  }
  return sheet;
}

function jsonOk(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
