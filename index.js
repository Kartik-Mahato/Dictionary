let def=document.querySelector('.def');
let input = document.querySelector('#input');
let search = document.querySelector('#search');
let api = '6b5d8f64-1040-48b4-a182-934e93430353'
let audioBox=document.querySelector('.audio')
let notFound = document.querySelector('.not-found');
let loading = document.querySelector('.loading');




search.addEventListener('click', function (e) {
    e.preventDefault();
    // clear data
    audioBox.innerHTML='';
    notFound.innerText='';
    def.innerText='';

    // get the data inputted
    let word = input.value;
    // calling api
    if (word == '') {
        alert('Word is required');
        return;
    }
    getData(word);
})

async function getData(word) {
    loading.style.display='block';
    // ajax call
    const response = await fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${api}`)

    const data = await response.json();
    console.log(data);
    
    // if empty result
    if (!data.length) {
        loading.style.display='none';
        notFound.innerText = "No Result Found"
        return;
    }

    // suggestions
    if (typeof data[0] === 'string') {
        loading.style.display='none';
        let heading = document.createElement('h2');
        heading.innerText = 'Did You Mean ?'
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            notFound.appendChild(suggestion);
        })
        return;
    }
    // results
    loading.style.display='none';
    let definition=data[0].shortdef[0];
    def.innerText=definition;

    // audio
    const audio=data[0].hwi.prs[0].sound.audio;
        if(audio){
            renderaudio(audio);
        }

}

function renderaudio(audio){
    // 'https://media.merriam-webster.com/soundc11'
    let subFolder=audio.charAt[0];
    let audiosrc=`https://media.merriam-webster.com/audio/prons/en/us/mp3/${subFolder}/${audio}.mp3?key=${api}`;
    let aud=document.createElement('audio');
    aud.src=audiosrc;
    aud.controls=true;
    audioBox.appendChild(aud);
}