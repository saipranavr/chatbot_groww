
  var INDEX = 0; 
  document.getElementById("chat-submit").onclick = (e) => {
    e.preventDefault();
    var msg = document.getElementById("chat-input").value;
    if(msg.trim() == ''){
      return false;
    }
    generate_message(msg, 'self');
    
    fetchmsg(msg);
    setTimeout(function() {  
    // generate_message(msg, 'user');  
    }, 1000)
    
  }

  var generate_message  = (msg, type) =>{
    INDEX++;
    
    var str="";
    str += `<div id='cm-msg-${INDEX}' class="chat-msg ${type}">`;
    str += `          <span class="msg-avatar">`;
    // str += `            <img src="https://image.crisp.im/avatar/operator/196af8cc-f6ad-4ef7-afd1-c45d5231387c/240/?1483361727745\">`;
    str += `          </span>`;
    str += `          <div class="cm-msg-text">`;
    str += msg;
    str += `          </div>`;
    str += `        </div>`;
    $(".chat-logs").append(str);
    // document.getElementsByClassName("chat-logs").;
    $("#cm-msg-"+INDEX).hide().fadeIn(300);
    if(type == 'self'){
     $("#chat-input").val(''); 
    }    
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
  }

  document.getElementById("open").onclick = openForm;
  document.getElementById("close").onclick = closeForm;

function openForm() {
 var element = document.querySelector(".chat-box").style.display ;
    if(element == "none")
      document.querySelector(".chat-box").style.display = "block"
    else
      document.querySelector(".chat-box").style.display = "none"  
}
function closeForm() {
  document.querySelector(".chat-box").style.display = "none";
}

function fetchmsg(text){

  var url = 'http://localhost:3030/tq';
  var userId= "gaurav"+Math.floor(Math.random()*(1000 - 100 + 1) + 100)
  let data = {
    text: `"${text}"`,
    userId: `"${userId}"`
  }
  let fetchData = {
    method: 'POST',
    body: JSON.stringify(data),
    
    headers: new Headers({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  }

  fetch(url, fetchData).then(res => {
        // console.log(data);
        // console.log(res+ "hello");
        return (res.json());})
        .then(response =>{
        // console.log("yes",response);
        // var a =`${response.fulfillmentText}`;
        //  console.log("a = ",a);
       serverMessage(response.fulfillmentText);

        }).catch(error => console.error('gaurav Error h:', error));
}


function serverMessage(msg) {
  INDEX++; 
    var str="";
    str += `<div id='cm-msg-${INDEX}' class="chat-msg user}">`;
    str += `          <div class="cm-msg-text">`;
    str += msg;
    str += `          </div>`;
    str += `        </div>`;
    $(".chat-logs").append(str);
    $("#cm-msg-"+INDEX).hide().fadeIn(300);
    
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
}

