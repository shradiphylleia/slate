document.addEventListener('DOMContentLoaded', (event) => {
    intro(); // Call intro function when the DOM content is loaded
});
function intro() {
    let opt = ['students', 'professionals', 'teams'];
    let index = 0;
    setInterval(() => {
        document.getElementById('introChange').innerHTML = "A consolidated tool for " + opt[index]; 
        index = (index + 1) % opt.length;
    }, 2000);
}
