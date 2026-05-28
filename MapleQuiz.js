function displayQuiz() {
    const questions = [
        {
            question: "You're just starting on Maple and need to decide on a class to main! Do you...",
            choices: ["Pick something that looks cool!", "Look at a tier list on YouTube", "Ask your frens who already play for suggestions"],
            weights: [
                {perceivingScore: +1, judgingScore: 0 },
                {judgingScore: +1, perceivingScore: 0 },
                {perceivingScore: +1, judgingScore: 0 },
            ]
        },
        {
            question: "Your fren wants to bring someone you barely know into your ckalos pt.. What will you say?",
            choices: ["Sure, new friend!", "Hell no, my meso/drops", "Idk, will they grief?"],
            weights: [
                {extrovertScore: +1, introvertScore: 0 },
                {introvertScore: +1, extrovertScore: 0 },
                {introvertScore: +1, extrovertScore: 0 },
            ]
        },
        {
            question: "It's SSF and you hit a 21 eternal in 10b! Do you tap to 22 or focus on your other equips?",
            choices: ["I'm feeling lucky today", "This is a big dmg increase already and I have gains to make elsewhere"],
            weights: [
                {feelingScore: +1, thinkingScore: 0 },
                {thinkingScore: +1, feelingScore: 0 },
            ]
        },
        {
            question: "Someone in your guild's discord is flexing their gene badge that they just got after several months of running bm. What do you react with?",
            choices: ["pog", "It's always the same ppl hitting, when will it be my turn"],
            weights: [
                {thinkingScore: +1, feelingScore: 0 },
                {feelingScore: +1, thinkingScore: 0 },
            ]
        },
        {
            question: "You had a busy day today and only have 10 minutes to play before reset. Do you...",
            choices: ["Do symbol dailies — slow and steady wins the race", "Do daily bosses — maybe something will drop!", "Do mp — exp is valuable"],
            weights: [
                {judgingScore: +1, perceivingScore: 0 },
                {perceivingScore: +1, judgingScore: 0 },
                {judgingScore: +1, perceivingScore: 0 },
            ]
        },
        {
            question: "You've just charged 100k nx to your account. What do you spend it on?",
            choices: ["Open some premium surprise boxes for the next best thing", "Buy your vac pet subscription (or do wonderberries)", "Get a new look with royal face/hairs", "I wouldn't charge 100k nx, Nexon doesn't deserve my money"],
            weights: [
                {sensingScore: +1, intuitionScore: 0 },
                {intuitionScore: +1, sensingScore: 0 },
                {sensingScore: +1, intuitionScore: 0 },
                {intuitionScore: +1, sensingScore: 0 },
            ]
        },
        {
            question: "Maple is under maintenance again. What do you do in the meantime?",
            choices: ["Scroll the subreddit", "Play other games", "Get off your pc and touch grass"],
            weights: [
                {intuitionScore: +1, sensingScore: 0 },
                {sensingScore: +1, intuitionScore: 0 },
                {intuitionScore: +1, sensingScore: 0 },
            ]
        },
        {
            question: "Which map would you prefer to afk in?",
            choices: ["c1 Henesys", "A quiet, scenic hidden map", "Endgame town for quick access to shops", "Your guild's hq"],
            weights: [
                {extrovertScore: +1, introvertScore: 0 },
                {introvertScore: +1, extrovertScore: 0 },
                {introvertScore: +1, extrovertScore: 0 },
                {extrovertScore: +1, introvertScore: 0 },
            ]
        },
        {
            question: "Your main just lost -20% fd in the most recent balance patch.. will you",
            choices: ["Switch to a stronger class that just got 30% fd", "Stick with your class and pray to chang soup it gets buffed"],
            weights: [
                {thinkingScore: +1, feelingScore: 0 },
                {feelingScore: +1, thinkingScore: 0 },
            ]
        },
        {
            question: "Your mule gets a pitch drop. You think..",
            choices: ["Yay, a pitch!", "Why couldn't it be my main"],
            weights: [
                {perceivingScore: +1, judgingScore: 0 },
                {judgingScore: +1, perceivingScore: 0 },
            ]
        },
        {
            question: "You start cubing and hit a fake 3 line with 2 allstats on your freshly made 22 eternals with 2b left in the bank! Do you:",
            choices: ["My eternals deserve better!! Continue bluecubing!", "Purple cube the rest…..", "No moni broke….. settle"],
            weights: [
                {sensingScore: +1, intuitionScore: 0 },
                {intuitionScore: +1, sensingScore: 0 },
                {sensingScore: +1, intuitionScore: 0 },
            ]
        },
        {
            question: "You are starting new and your friend tells you they can carry you through bosses! Do you accept or refuse?",
            choices: ["Free carries!", "Just for the hard stuff", "I want to experience everything on my own"],
            weights: [
                {extrovertScore: +1, introvertScore: 0 },
                {extrovertScore: +1, introvertScore: 0 },
                {introvertScore: +1, extrovertScore: 0 },
            ]
        },
        {
            question: "Your friend is fairly new.. He's depressed because he boomed 3 CRA's and he's having second thoughts about this game. What do you tell him?",
            choices: ["Should take a break..!", "It's okay, I've boomed much more", "Time to farm up again!"],
            weights: [
                {feelingScore: +1, thinkingScore: 0 },
                {thinkingScore: +1, feelingScore: 0 },
                {feelingScore: +1, thinkingScore: 0 },
            ]
        },
        {
            question: "You know your friend is very lucky but he's always complaining about his luck.. Always talking about how unlucky he is without mentioning things he got lucky with. Do you:",
            choices: ["Don't want to talk about any gains or losses with him anymore", "Sympathize with his losses", "Ghost him"],
            weights: [
                {thinkingScore: +1, feelingScore: 0 },
                {feelingScore: +1, thinkingScore: 0 },
                {thinkingScore: +1, feelingScore: 0 },
            ]
        },
        {
            question: "A Seren Emblem! You are in a party of 3 filled with randoms you likely won't see again and Seren Emblem is the last pitched you need for 10 set.. Do you:",
            choices: ["Suggest perm party for rotation of Seren Emblem", "Suggest to take it since it's your last slot to fill", "Yoink!"],
            weights: [
                {judgingScore: +1, perceivingScore: 0 },
                {judgingScore: +1, perceivingScore: 0 },
                {perceivingScore: +1, judgingScore: 0 },
            ]
        },
    ]

    const MBTI_QUESTION_COUNT = 15;


    //Variables for scores
    let currentQuestionIndex = 0;
    let introvertScore = 0;
    let extrovertScore = 0;
    let judgingScore = 0;
    let perceivingScore = 0;
    let sensingScore = 0;
    let intuitionScore = 0;
    let thinkingScore = 0;
    let feelingScore = 0;


    const QUESTION_IMAGE_SCALES = {
        2: 1.015,
        3: 1.05,
        5: 0.90,
        8: 0.95,
        9: 1.05,
        11: 0.97,
        14: 0.95,
    };

    const QUESTION_IMAGE_OFFSET_Y = {
        2: -12,
        3: -12,
        6: -12,
        9: -22,
        11: -12,
        12: -12,
        13: -12,
        14: -12,
    };

    function applyQuestionImageTransform(questionImageElement, questionIndex) {
        const scale = QUESTION_IMAGE_SCALES[questionIndex] || 1;
        const offsetY = QUESTION_IMAGE_OFFSET_Y[questionIndex] || 0;
        const parts = [];
        if (offsetY) parts.push('translateY(' + offsetY + 'px)');
        if (scale !== 1) parts.push('scale(' + scale + ')');
        questionImageElement.style.transform = parts.length ? parts.join(' ') : '';
    }

    function getQuestionChibiImage(questionIndex) {
        if (questionIndex < 0 || questionIndex >= MBTI_QUESTION_COUNT) return '';
        const qNum = questionIndex + 1;
        return encodeURI('personality test chibis q' + qNum + '.png');
    }

    function updateQuizProgress(questionIndex, isCollectStep) {
        const progressLabel = document.getElementById('progress-label');
        const progressFill = document.getElementById('progress-fill');
        const progressPct = document.getElementById('progress-percent');

        if (isCollectStep) {
            if (progressLabel) progressLabel.textContent = 'Q15 / 15';
            if (progressFill) progressFill.style.width = '100%';
            if (progressPct) progressPct.textContent = '100%';
            return;
        }

        const qNum = questionIndex + 1;
        const pct = Math.round((qNum / MBTI_QUESTION_COUNT) * 100);
        if (progressLabel) progressLabel.textContent = 'Q' + qNum + ' / ' + MBTI_QUESTION_COUNT;
        if (progressFill) progressFill.style.width = pct + '%';
        if (progressPct) progressPct.textContent = pct + '%';
    }
    window.updateQuizProgress = updateQuizProgress;

    const QUESTION_IMAGE_FADE_MS = 130;

    function revealQuestionImage(questionImageElement) {
        function onReady() {
            questionImageElement.classList.add('loaded');
        }
        questionImageElement.addEventListener('load', onReady, { once: true });
        questionImageElement.addEventListener('error', onReady, { once: true });
        if (questionImageElement.complete) {
            onReady();
        }
    }

    function displayQuestionImage(questionIndex) {
        const questionImageElement = document.getElementById('question-image');
        if (!questionImageElement) return;
        const src = getQuestionChibiImage(questionIndex);

        if (!src) {
            questionImageElement.removeAttribute('src');
            questionImageElement.classList.remove('loaded');
            questionImageElement.style.transform = '';
            return;
        }

        const swapImage = function() {
            applyQuestionImageTransform(questionImageElement, questionIndex);
            questionImageElement.src = src;
            revealQuestionImage(questionImageElement);
        };

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            swapImage();
            return;
        }

        if (questionImageElement.classList.contains('loaded')) {
            questionImageElement.classList.remove('loaded');

            var fadedOut = false;
            function finishFadeOut() {
                if (fadedOut) return;
                fadedOut = true;
                questionImageElement.removeEventListener('transitionend', onFadeOut);
                swapImage();
            }

            function onFadeOut(e) {
                if (e.propertyName !== 'opacity') return;
                finishFadeOut();
            }

            questionImageElement.addEventListener('transitionend', onFadeOut);
            setTimeout(finishFadeOut, QUESTION_IMAGE_FADE_MS + 50);
        } else {
            swapImage();
        }
    }

    const HOME_FADE_MS = 550;
    const QUIZ_FADE_MS = 450;

    document.getElementById('begin-quiz').addEventListener('click', function() {
        const home = document.getElementById('home');
        const quizPage = document.getElementById('quiz-page');
        const beginBtn = document.getElementById('begin-quiz');
        if (!home || !quizPage || home.classList.contains('is-leaving')) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const homeFadeMs = reducedMotion ? 0 : HOME_FADE_MS;
        const quizFadeMs = reducedMotion ? 0 : QUIZ_FADE_MS;

        beginBtn.disabled = true;

        function showQuiz() {
            home.style.display = 'none';
            home.classList.remove('is-leaving');
            quizPage.style.display = 'flex';

            if (quizFadeMs === 0) {
                quizPage.classList.remove('is-entering', 'is-visible');
                beginBtn.disabled = false;
                return;
            }

            quizPage.classList.add('is-entering');
            quizPage.classList.remove('is-visible');
            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    quizPage.classList.add('is-visible');
                });
            });
            setTimeout(function() {
                quizPage.classList.remove('is-entering', 'is-visible');
                beginBtn.disabled = false;
            }, quizFadeMs + 50);
        }

        if (homeFadeMs === 0) {
            showQuiz();
            return;
        }

        home.classList.add('is-leaving');

        var done = false;
        function finish() {
            if (done) return;
            done = true;
            home.removeEventListener('transitionend', onTransitionEnd);
            showQuiz();
        }

        function onTransitionEnd(e) {
            if (e.target !== home || e.propertyName !== 'opacity') return;
            finish();
        }

        home.addEventListener('transitionend', onTransitionEnd);
        setTimeout(finish, homeFadeMs + 80);
    });

    //Function to display the current question and choices
    function displayCurrentQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        const questionElement = document.getElementById('question');
        const progressImageElement = document.getElementById('question-progress-image');
        const choiceContainers = document.getElementById('choices');
        const questCard = document.getElementById('quest-card');
        const quizEl = document.getElementById('quiz');
        const isCollectStep = !!currentQuestion.isCollectStep;

        choiceContainers.innerHTML = '';

        if (questCard) {
            questCard.classList.toggle('is-collect-step', isCollectStep);
        }
        if (quizEl) {
            quizEl.classList.toggle('is-collect-mode', isCollectStep);
        }

        questionElement.textContent = currentQuestion.question;

        if (isCollectStep) {
            if (progressImageElement) progressImageElement.src = '';
            updateQuizProgress(currentQuestionIndex, true);
            displayQuestionImage(MBTI_QUESTION_COUNT - 1);
        } else {
            progressImageElement.src = getQuestionProgressImage(currentQuestionIndex);
            updateQuizProgress(currentQuestionIndex, false);
            displayQuestionImage(currentQuestionIndex);
        }

        currentQuestion.choices.forEach((choice, index) => {
                //Buttons for choices
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = choice;
            button.classList.add('choices');
            if (isCollectStep) {
                button.classList.add('choices-collect');
            }
            button.addEventListener('click', () => handleChoiceClick(index));
            choiceContainers.appendChild(button);
        });
        }

    //Function to get progress bar image URL for the current question
    function getQuestionProgressImage(questionIndex) {
        const progressImageURLs = [
            "Q1 progress.svg",
            "Q2 progress.svg",
            "Q3 progress.svg",
            "Q4 progress.svg",
            "Q5 progress.svg",
            "Q6 progress.svg",
            "Q7 progress.svg",
            "Q8 progress.svg",
            "Q9 progress.svg",
            "Q10 progress.svg",
            "Q11 progress.svg",
            "Q12 progress.svg",
            "Q13 progress.svg",
            "Q14 progress.svg",
            "Q15 progress.svg",
        ];
        return progressImageURLs[questionIndex] || "";
    }

    //Function to handle choice click
    function handleChoiceClick(choiceIndex) {
        // Update scores based on user response
        const currentQuestion = questions[currentQuestionIndex];
        const selectedChoiceWeight = currentQuestion.weights[choiceIndex];
        console.log("Selected choice weight:", selectedChoiceWeight);

                //Update scores based on weight of selected choice
                if (selectedChoiceWeight.hasOwnProperty('introvertScore')) {
                    introvertScore += selectedChoiceWeight.introvertScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('extrovertScore')) {
                    extrovertScore += selectedChoiceWeight.extrovertScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('judgingScore')) {
                    judgingScore += selectedChoiceWeight.judgingScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('perceivingScore')) {
                    perceivingScore += selectedChoiceWeight.perceivingScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('sensingScore')) {
                    sensingScore += selectedChoiceWeight.sensingScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('intuitionScore')) {
                    intuitionScore += selectedChoiceWeight.intuitionScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('thinkingScore')) {
                    thinkingScore += selectedChoiceWeight.thinkingScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('feelingScore')) {
                    feelingScore += selectedChoiceWeight.feelingScore;
                }

            //Move to the next question
            currentQuestionIndex++;

            if (currentQuestionIndex < questions.length) {
                displayCurrentQuestion();
            } else {
                calculateMBTITypeAndDisplayImage();
            }
        }


    //Function to calculate MBTI type based on scores and display image
    function calculateMBTITypeAndDisplayImage() {
        //Calculate introvert/extrovert dimension
        const introextro = introvertScore > extrovertScore ? "I" : "E";
        const sensint = sensingScore > intuitionScore ? "S" : "N";
        const thinkfeel = thinkingScore > feelingScore ? "T" : "F";
        const judgeper = judgingScore > perceivingScore ? "J" : "P";
        //Produce MBTI type string
        const mbtiTypeString = introextro + sensint + thinkfeel + judgeper;

        console.log("MBTI Type:", mbtiTypeString);

        //Remove quiz-related elements from the DOM
        const questionElement = document.getElementById('question');
        const choiceContainers = document.getElementById('choices');
        const quizContainer = document.getElementById('quiz');
        const thumbnailImage = document.querySelector('img[src="Thumbnail.gif"]');
        if (questionElement) questionElement.remove();
        if (choiceContainers) choiceContainers.remove();
        if (quizContainer) quizContainer.remove();
        if (thumbnailImage) thumbnailImage.remove();

        if (typeof window.showMapleResult === 'function') {
            window.showMapleResult(mbtiTypeString);
        } else {
            displayImage(mbtiTypeString);
            document.getElementById('results').style.display = 'flex';
        }
    }

    //Function to calculate MBTI type and return image URL
        function getMBTIImageUrl(mbtiTypeString) {
            const MBTIImageUrls = {
                "ISTJ": "result_ren.png",
                "ISFJ": "result_kaiser.png",
                "INFJ": "result_pally.png",
                "INTJ": "result_bla.png",
                "ISTP": "result_cad.png",
                "ISFP": "result_pf.png",
                "INFP": "result_bish.png",
                "INTP": "result_adele.png",
                "ESTP": "result_ds.png",
                "ESFP": "result_ab.png",
                "ENFP": "result_lara.png",
                "ENTP": "result_hayato.png",
                "ESTJ": "result_shad.png",
                "ESFJ": "result_hero.png",
                "ENFJ": "result_nl.png",
                "ENTJ": "result_merc.png",
            };
            return MBTIImageUrls[mbtiTypeString] || ""
        }

        //Display image
        function displayImage(mbtiTypeString) {
            const imageURL = getMBTIImageUrl(mbtiTypeString);
            const mbtiImageContainer = document.getElementById('mbti-image');
            const imageElement = document.createElement('img');
            imageElement.src = imageURL;

            mbtiImageContainer.appendChild(imageElement);

    }
        //Display the first question when the quiz starts
        displayCurrentQuestion();
        document.addEventListener('DOMContentLoaded', () => {
        const choiceContainers = document.querySelectorAll('.choice-container');
        choiceContainers.forEach((container) => {
            const choices = container.querySelectorAll('button');
            choices.forEach((choice, choiceIndex) => {
                choice.addEventListener('click', () => {
                    handleChoiceClick(choiceIndex);
                });
            });
        });
    });
}

//Call function to start the quiz
displayQuiz();

// Share and back-to-home are handled in index.html

