youChannel
==========

Consente lo scan e visualizzazione dei canali youtube in embed

Utilizzate api youtube v2 in quanto non richiedono l'OAUTH


=================================================================================================================

Per istanziarlo basta semplicemente passare un oggetto con il nome del canale ed uno per le opzioni
```javascript
$('#player').youChannel({
        user:'Basisumisura',
        playopts: {
            autoplay: 1,
            ...
        }
});
```

<h1>ToDo</h1>

<ul>
        <li>Risolvere bug: <code> Blocked a frame with origin "http://www.youtube.com" from accessing a frame with origin "http://localhost". 
        <br/>Protocols, domains, and ports must match. </code>
        </li>
        <li>Completare la documentazione con i css</li>
</ul>
