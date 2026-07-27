// ==========================
// ELEMENTS
// ==========================

const analysisBox = document.getElementById("analysisBox");
const analysisText = document.getElementById("analysisText");
const progressFill = document.getElementById("progressFill");

const profilePage = document.getElementById("profilePage");
const dashboardArea = document.getElementById("dashboardArea");

const chatSection = document.getElementById("chatSection");

const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const micBtn = document.getElementById("micBtn");
let selectedProfile = "";



// ==========================
// FIRST MORPH ANALYSIS
// ==========================

const firstSteps = [

    "🧠 Understanding Human Needs...",

    "🏥 Connecting Hospital Environment...",

    "🌍 Preparing Adaptive Experience...",

    "✅ MORPH AI Ready"

];


let firstProgress = 0;
let firstIndex = 0;



const firstTimer = setInterval(()=>{


    firstProgress +=25;


    progressFill.style.width =
    firstProgress+"%";


    analysisText.innerHTML =
    firstSteps[firstIndex];

    firstIndex++;



    if(firstProgress >=100){


        clearInterval(firstTimer);


        setTimeout(()=>{


            analysisBox.style.display="none";

            profilePage.style.display="block";


        },1000);


    }



},1000);








// ==========================
// PROFILE CARD CLICK
// ==========================


const profiles =
document.querySelectorAll(".profile-card");



profiles.forEach(card=>{


    card.addEventListener("click",()=>{


        const profile =
        card.querySelector("h3").innerText;


 selectedProfile = profile;
        startAdaptation(profile);



    });



});







// ==========================
// SECOND AI ANALYZER
// ==========================


function startAdaptation(profile){



    profilePage.style.display="none";


    dashboardArea.style.display="block";



    dashboardArea.innerHTML = `


    <div class="morph-analyser">


        <div class="ai-circle">
            🤖
        </div>


        <h2>
        MORPH AI Adaptation Engine
        </h2>


        <p id="adaptText">
        Analysing ${profile} requirements...
        </p>



        <div class="ai-progress">

            <div id="aiProgress"></div>

        </div>




        <div class="analysis-steps">


            <p id="a1">
            ◯ Understanding User Profile
            </p>


            <p id="a2">
            ◯ Scanning Hospital Environment
            </p>


            <p id="a3">
            ◯ Creating Personal Experience
            </p>


        </div>



    </div>



    `;




    let progress =0;



    const timer=setInterval(()=>{


        progress+=25;



        document.getElementById("aiProgress")
        .style.width=progress+"%";



        if(progress>=25){

            document.getElementById("a1")
            .innerHTML=
            "✓ Understanding User Profile";

        }



        if(progress>=50){

            document.getElementById("a2")
            .innerHTML=
            "✓ Scanning Hospital Environment";

        }



        if(progress>=75){

            document.getElementById("a3")
            .innerHTML=
            "✓ Creating Personal Experience";

        }




        if(progress>=100){


            clearInterval(timer);



            setTimeout(()=>{


                showDashboard(profile);



            },1000);



        }




    },800);




}








// ==========================
// PREMIUM DASHBOARD
// ==========================


function showDashboard(profile){



let data={



"Visually Impaired":[

["🔊","Voice Navigation","Active"],

["🗺️","Smart Guidance","Ready"],

["💊","Medicine Support","Available"]

],




"Wheelchair User":[

["🛗","Accessible Lift","Optimised"],

["🛣️","Wheelchair Route","Created"],

["🚻","Accessible Facility","Located"]

],




"Elderly":[

["🏥","Department Finder","Ready"],

["📅","Appointment","Available"],

["💊","Pharmacy Support","Active"]

],




"Tourist":[

["🌐","Translation","Ready"],

["🗣️","Language Assistant","Active"],

["📍","Hospital Guide","Available"]

],




"Emergency":[

["🚑","Emergency Route","Generated"],

["📍","Location Sharing","Ready"],

["👨‍⚕️","Doctor Assistance","Connecting"]

]


};




let features=data[profile];

dashboardArea.innerHTML=`


<div class="morph-dashboard">



<div class="morph-header">


<div class="ai-circle">

🤖

</div>


<div>

<h2>

${profile} Mode Activated

</h2>


<p>

MORPH AI created a personalised hospital experience.

</p>


</div>


</div>





<div class="feature-grid">


${features.map(item=>`


<div class="feature-card">


<span>
${item[0]}
</span>


<h3>
${item[1]}
</h3>


<p>
${item[2]}
</p>


</div>


`).join("")}


</div>




<div class="morph-footer">


🧠 MORPH AI Adaptation Complete

<br>

Your personalised experience is ready.


</div>



</div>



`;



chatSection.style.display="block";



}









// ==========================
// CHAT FUNCTION
// ==========================

sendBtn.addEventListener("click", async () => {

    const text = userInput.value.trim();

    if (text === "") return;

    // User Message
    chatMessages.innerHTML += `
        <div class="bot-message">
            👤 <b>You:</b> ${text}
        </div>
    `;
    

    userInput.value = "";

    // Thinking Message
    chatMessages.innerHTML += `
        <div class="bot-message" id="typing">
            🤖 MORPH AI is thinking...
        </div>
    `;
    

    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {

        const response = await fetch("https://morph-ai-bxfd.onrender.com/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
    message: text,
    profile: selectedProfile
})
        });

        const data = await response.json();

        document.getElementById("typing").remove();

        chatMessages.innerHTML += `
            <div class="bot-message">
                🤖 <b>MORPH AI:</b><br><br>
                ${data.reply}
            </div>
        `;
const voice = new SpeechSynthesisUtterance(data.reply);

voice.lang = "en-US";
voice.rate = 0.9;

window.speechSynthesis.cancel();
window.speechSynthesis.speak(voice);
    } catch (error) {

        const typing = document.getElementById("typing");

        if (typing) typing.remove();

        chatMessages.innerHTML += `
            <div class="bot-message">
                ❌ Unable to connect to MORPH AI.
            </div>
        `;

        console.error(error);
    }

    chatMessages.scrollTop = chatMessages.scrollHeight;

});
// ==========================
// VOICE INPUT
// ==========================

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    micBtn.addEventListener("click", () => {

        recognition.start();

    });

    recognition.onresult = (event) => {

        const transcript = event.results[0][0].transcript;

        userInput.value = transcript;

        sendBtn.click();

    };

    recognition.onerror = (event) => {

        alert("Voice Error: " + event.error);

    };

} else {
    micBtn.disabled = true;
    micBtn.title = "Voice input is not supported in this browser.";
}