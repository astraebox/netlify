var stripe = Stripe("pk_test_cRc4ulS65MTe1QmIRrpSnbFt");
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
var style = {
base: {
    // Add your base input styles here. For example:
    fontSize: '16px',
    color: "#32325d",
}
};

// Create an instance of the card Element.
var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#tarjeta');

function stripeTokenHandler(token) {
    // Inserta token en formulario
    var form = document.getElementById('formulario-pago');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);
  
    // Manda formulario
    form.submit();
  }
  
  function createToken() {
    stripe.createToken(card).then(function(result) {
      if (result.error) {
        // Informa si hay un error
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Mnada el token al servidor
        stripeTokenHandler(result.token);
      }
    });
  };
  
  // Al mandar formulario insertar token
  var form = document.getElementById('formulario-pago');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    createToken();
  });