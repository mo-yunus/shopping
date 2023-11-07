if(document.readyState == 'loading')
{
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

function ready()
{
    let removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for(var i = 0; i < removeCartItemButtons.length; i++)
    {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    let inputQuantity = document.getElementsByClassName('cart-quantity-input')
    for(var i = 0; i < inputQuantity.length; i++)
    {
        var input = inputQuantity[i]
        input.addEventListener('change', changeQuantity)
    }

    var addTocartButtons = document.getElementsByClassName('shop-item-button')
    for(var i = 0; i < addTocartButtons.length; i++){
        var button = addTocartButtons[i]
        button.addEventListener('click', addTocartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0]. addEventListener('click', purchaseClicked)
}

function purchaseClicked(){
    alert('Thank you for your patronage')
    var cartItems = document.getElementsByClassName('cart-items')[0]

    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }

    updateCartTotal()
}


function addTocartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageScr = shopItem.getElementsByClassName('shop-item-image')[0].src

    addItemToCart(title, price, imageScr)
    updateCartTotal()
}

function addItemToCart(title, price, imageScr){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]

    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for(var i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('This item is already added to the cart')
            return
        }
    }

    var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageScr}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input"  type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', changeQuantity)

}

function changeQuantity(event)
{
    var input = event.target
    if(isNaN(input.value) || input.value <= 0)
    {
        input.value = 1
    }

    updateCartTotal()
}

function removeCartItem (event)
{
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
}

function updateCartTotal ()
{
    var cartItem = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItem.getElementsByClassName('cart-row')
    var total = 0

    for (var i = 0; i < cartRows.length; i++)
    {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100

    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}






//The parseFloat() function is used to accept a string and convert it into a floating-point number. 
//If the input string does not contain a numeral value or If the first character of the string is not a number then it returns NaN i.e, not a number.