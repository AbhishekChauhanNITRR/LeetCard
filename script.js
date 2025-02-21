document.addEventListener("DOMContentLoaded",()=>{
    let button=document.querySelector("#submit-button");
    button.addEventListener("click",fetchLeetCodeData);
});
async function fetchLeetCodeData(){

    let username=document.querySelector("#write").value.trim();
    let button=document.querySelector("#submit-button");
    if(username==="")
    {
        updateUIinitail();
        alert("Enter the Username!");
        return;
    }
    toggleButton(button);
    let apiUrl=`https://alfa-leetcode-api.onrender.com/userProfile/${username}`;
    let contestUrl=`https://alfa-leetcode-api.onrender.com/userContestRankingInfo/${username}`;


    try{
        let response=await fetch(apiUrl);
        let response2=await fetch(contestUrl);
        if(!response.ok || !response2.ok){
            if(!response.ok)
            throw new Error(`HTTP Error! Status: ${response.status}`);
            else{
                throw new Error(`HTTP Error! Status: ${response2.status}`);
            }
        }
        let data=await response.json();
        let data2=await response2.json();
        if(data.status==="error" || data2.status==="error")
        {
            updateUIinitail();
            alert("User not found!");
            return;
        }
        updateUI(data,data2);
    }
    catch(error){
        console.error("Error fetching data:", error);
        alert("Failed to fetch data. Try again later.");
    }
    finally{
        toggleButton(button);
    }

}
let updateUIinitail=()=>{
    document.getElementById("easy-done").textContent = "a";
    document.getElementById("medium-done").textContent = "a";
    document.getElementById("hard-done").textContent = "a";

    
    document.getElementById("easy-total").textContent = "b";
    document.getElementById("medium-total").textContent = "b";
    document.getElementById("hard-total").textContent = "b";

    
    document.getElementById("sub-all").querySelector("span").textContent = 0;
    document.getElementById("sub-easy").querySelector("span").textContent = 0;
    document.getElementById("sub-med").querySelector("span").textContent = 0;
    document.getElementById("sub-hrd").querySelector("span").textContent = 0;

    document.querySelectorAll(".bars span").forEach(span => {
        span.style.color = "azure";
    });
}
let updateUI=(data,data2)=>{

    let easyPercent= (data.easySolved/data.totalEasy)*100;
    let mediumPercent= (data.mediumSolved/data.totalMedium)*100;
    let hardPercent= (data.hardSolved/data.totalHard)*100;


    document.getElementById("easy-done").textContent = data.easySolved;
    document.getElementById("medium-done").textContent = data.mediumSolved;
    document.getElementById("hard-done").textContent = data.hardSolved;

    
    document.getElementById("easy-total").textContent = data.totalEasy;
    document.getElementById("medium-total").textContent = data.totalMedium;
    document.getElementById("hard-total").textContent = data.totalHard;

    
    document.getElementById("sub-all").querySelector("span").textContent = data.totalSolved;
    document.getElementById("sub-easy").querySelector("span").textContent = data2.data.userContestRanking.rating;
    document.getElementById("sub-med").querySelector("span").textContent = data2.data.userContestRanking.topPercentage+"%";
    document.getElementById("sub-hrd").querySelector("span").textContent = data.contributionPoint;

    document.getElementById("c1").style.setProperty("--easyPercent",`${easyPercent}%`);
    document.getElementById("c2").style.setProperty("--mediumPercent",`${mediumPercent}%`);
    document.getElementById("c3").style.setProperty("--hardPercent",`${hardPercent}%`);

    document.querySelectorAll(".bars span").forEach(span => {
        span.style.color = "rgb(12, 237, 12)";
    });
    
}
let toggleButton=(button)=>{
    if(button.textContent==="Submit")
    {
        button.textContent="Fetching...";
        button.disabled=true;
    }
    else{
        button.textContent="Submit";
        button.disabled=false;
    }
}
