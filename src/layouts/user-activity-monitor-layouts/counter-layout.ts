export const counterLayout = `
<div id="content-counter">
    <h2 class="margin-top-0">Counter</h2>
    <p class="project__component-text">
        Descripción: Este componente interactivo nos permite modificar un
        contador numerico a traves de varios botones, cada uno con una
        funcionalidad especifica: 
    </p>
    <ul>
        <li>
            <span class="bold">"+":</span> el contador se incrementa en 1.
        </li>
        <li>
            <span class="bold">"++":</span> el contador se incrementa en 10.
        </li>
        <li>
            <span class="bold">"Reset":</span> el contador se restablece a 0.
        </li>
        <li>
            <span class="bold">"Random":</span> el contador se incrementa o decrementa por un número aleatorio entre -20 y 20. 
        </li>
        <li>                                
            <span class="bold">"-":</span> el contador se decrementa en 1.
        </li>
        <li>
            <span class="bold">"--":</span> el contador se decrementa en 10.
        </li>
    </ul>
    <div class="center margin-top-8">
        <div class="counter">
            <div class="counter__content">
                <p class="counter__title">Valor Actual:</p>
                <p class="counter__status" id="counter-status"></p>
            </div>

            <div class="counter__actions">
                <button class="button-secondary button--sm" id="counter-increment">+</button>
                <button class="button-secondary button--sm" id="counter-increment-by-10">++</button>
                <button class="button-secondary button--sm" id="counter-reset">Reset</button>
                <button class="button-secondary button--sm" id="counter-random">Random</button>
                <button class="button-secondary button--sm" id="counter-decrement">-</button>
                <button class="button-secondary button--sm" id="counter-decrement-by-10">--</button>
            </div>
        </div>
    </div>
</div>
`;
