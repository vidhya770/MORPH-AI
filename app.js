const cards = document.querySelectorAll(".experience-card");

const response = document.getElementById("response-text");


function showResponse(lines){

    response.innerHTML = "";

    let fullText = lines.join("<br>");

    let index = 0;


    let typing = setInterval(function(){

        response.innerHTML = fullText.substring(0, index);

        index++;


        if(index > fullText.length){

            clearInterval(typing);

        }

    },40);

}



// Accessibility Mode

cards[0].onclick = function(){

    showResponse([

        "🤖 MORPH Activated",

        "✓ Voice Navigation Enabled",

        "✓ Smart Path Guidance Ready",

        "✓ Accessibility Support Started"

    ]);

};



// Mobility Mode

cards[1].onclick = function(){

    showResponse([

        "🤖 MORPH Activated",

        "✓ Wheelchair Friendly Routes Created",

        "✓ Mobility Assistance Enabled",

        "✓ Smart Navigation Ready"

    ]);

};



// Elder Friendly Mode

cards[2].onclick = function(){

    showResponse([

        "🤖 MORPH Activated",

        "✓ Elder Care Mode Enabled",

        "✓ Simple Interface Activated",

        "✓ Personal Assistance Ready"

    ]);

};



// Tourist Mode

cards[3].onclick = function(){

    showResponse([

        "🤖 MORPH Activated",

        "✓ Language Translation Enabled",

        "✓ Visitor Communication Ready",

        "✓ Multi Language Support Activated"

    ]);

};
// Start Experience Button

const startBtn = document.getElementById("startBtn");

if(startBtn){

    startBtn.onclick = function(){

        window.location.href = "assistant.html";

    };

}