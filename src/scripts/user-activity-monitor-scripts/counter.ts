export const counter = () => {
  const counterContent = document.getElementById("counter-content");
  if (counterContent) {
    const counterStatus = document.getElementById("counter-status") as HTMLElement;
    let counter = 0;
    counterStatus.innerHTML = counter + "";

    const increment = document.getElementById("counter-increment") as HTMLElement
    const incrementBy10 = document.getElementById("counter-increment-by-10") as HTMLElement
    const reset = document.getElementById("counter-reset") as HTMLElement
    const random = document.getElementById("counter-random") as HTMLElement
    const decrement = document.getElementById("counter-decrement") as HTMLElement
    const decrementBy10 = document.getElementById("counter-decrement-by-10") as HTMLElement
    
    increment.addEventListener("click",()=>{
        counter++;
        counterStatus.innerHTML = counter + "";
    })
    incrementBy10.addEventListener("click",()=>{
        counter += 10;
        counterStatus.innerHTML = counter + "";
    })
    reset.addEventListener("click",()=>{
        counter = 0;
        counterStatus.innerHTML = counter + "";
    })
    random.addEventListener("click",()=>{
        counter = Math.floor(Math.random() * 100) + 1;
        counterStatus.innerHTML = counter + "";
    })
    decrement.addEventListener("click",()=>{
        counter--;
        counterStatus.innerHTML = counter + "";
    })
    decrementBy10.addEventListener("click",()=>{
        counter -= 10;
        counterStatus.innerHTML = counter + "";
    })
  }
};
