/**
 * Maple Personality Test — Google Sheets logger (no cookies)
 *
 * Tabs:
 *   raw   — column A: class result (row 2+), column B: shared Yes/No
 *   graph — fixed class order + COUNTIF counts + bar chart; row 19 = Shared? count
 *
 * Deploy as Web app (Execute as: Me, Anyone) → paste /exec URL in index.html
 */

var RAW_SHEET = 'raw';
var GRAPH_SHEET = 'graph';

var CLASS_ORDER = [
  'Ren', 'Kaiser', 'pally', 'Bla', 'Cad', 'Pf', 'Bish', 'Adele',
  'Ds', 'Ab', 'Lara', 'Hayato', 'Shad', 'Hero', 'Nl', 'Merc'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    ensureWorkbookStructure();

    var body = {};
    if (e && e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    }

    var action = String(body.action || 'logResult');

    if (action === 'markShared') {
      markLastRowShared_();
      return jsonOk({ ok: true, action: 'markShared' });
    }

    var className = String(body.className || body.class || '').trim();
    if (!className) {
      return jsonOk({ ok: false, error: 'Missing className' });
    }

    var shared = body.shared === true || body.shared === 'Yes' || body.shared === 'yes';
    appendRawRow_(className, shared);

    return jsonOk({ ok: true, action: 'logResult', className: className });
  } catch (err) {
    return jsonOk({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  ensureWorkbookStructure();
  return jsonOk({
    ok: true,
    message: 'Maple result logger ready. POST logResult or markShared.',
    classes: CLASS_ORDER
  });
}

/** Run once from the script editor: Setup → setupSheets */
function setupSheets() {
  ensureWorkbookStructure();
}

function ensureWorkbookStructure() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  setupRawSheet_(ss);
  setupGraphSheet_(ss);
}

function setupRawSheet_(ss) {
  var sheet = ss.getSheetByName(RAW_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(RAW_SHEET);
  }
  if (sheet.getLastRow() < 1) {
    sheet.getRange(1, 1, 1, 2).setValues([['Class', 'Shared']]);
    sheet.setFrozenRows(1);
  }
}

function setupGraphSheet_(ss) {
  var sheet = ss.getSheetByName(GRAPH_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(GRAPH_SHEET);
  }

  sheet.getRange(1, 1, 1, 2).setValues([['Class', 'Count']]);

  for (var i = 0; i < CLASS_ORDER.length; i++) {
    var row = i + 2;
    var cls = CLASS_ORDER[i];
    sheet.getRange(row, 1).setValue(cls);
    sheet.getRange(row, 2).setFormula(
      '=COUNTIF(raw!A:A,"' + cls.replace(/"/g, '""') + '")'
    );
  }

  var sharedRow = CLASS_ORDER.length + 3;
  sheet.getRange(sharedRow, 1).setValue('Shared?');
  sheet.getRange(sharedRow, 2).setFormula('=COUNTIF(raw!B:B,"Yes")');

  var charts = sheet.getCharts();
  for (var c = 0; c < charts.length; c++) {
    sheet.removeChart(charts[c]);
  }

  var dataRange = sheet.getRange(1, 1, CLASS_ORDER.length + 1, 2);
  var chart = sheet.newChart()
    .setChartType(Charts.ChartType.COLUMN)
    .addRange(dataRange)
    .setPosition(2, 4, 0, 0)
    .setOption('title', 'Maple Personality Results')
    .setOption('legend', { position: 'none' })
    .setOption('hAxis', { title: 'Class' })
    .setOption('vAxis', { title: 'Completions', minValue: 0 })
    .setNumHeaders(1)
    .build();

  sheet.insertChart(chart);
}

function appendRawRow_(className, shared) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(RAW_SHEET);
  var sharedLabel = shared ? 'Yes' : 'No';
  sheet.appendRow([className, sharedLabel]);
}

function markLastRowShared_() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(RAW_SHEET);
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return;
  }
  sheet.getRange(lastRow, 2).setValue('Yes');
}

function jsonOk(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
