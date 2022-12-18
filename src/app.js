const form=document.getElementsByName('form')[0];
const button=document.getElementById('button');
const footer=document.getElementById('footer');
const text=document.getElementById('text');
const  API_KEY_AI="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";

addEventListener('submit',async function(e){
      e.preventDefault();
      activeLoad();
      if(!text.value){
        disabledLoad()
        return null
      }
      try{
            let res= await fetch('https://api.openai.com/v1/completions',{
              method:'POST',
              headers:{
                'Content-Type':'application/json',
                 Authorization:`Bearer ${API_KEY_AI}`,
              },
              body:JSON.stringify(
                {prompt:text.value,
                 model:"text-davinci-003",
                 max_tokens:2000
                }),
            })
            res=await res.json()
            footer.innerHTML=clearHtmlText(res.choices[0].text);
            disabledLoad()
      }catch(e){
          disabledLoad()
      }
});
const clearHtmlText=(text)=>{
    return text.split('\n').map(str=>`<p>${str}</p>`).join("");
}
const activeLoad=()=>{
       button.setAttribute('aria-busy','true');
       button.disabled=true;
       footer.setAttribute('aria-busy','true');
}

const disabledLoad=()=>{
    button.setAttribute('aria-busy','alse');
    button.disabled=false;
    footer.setAttribute('aria-busy','false');
}