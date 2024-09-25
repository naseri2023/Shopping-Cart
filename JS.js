let shopItems = [
    {id : 1, title : "Album 1", image : "Images/Album 1.png", price : 50, quantity : 1},
    {id : 2, title : "Album 2", image : "Images/Album 2.png", price : 15, quantity : 1},
    {id : 3, title : "Album 3", image : "Images/Album 3.png", price : 10, quantity : 1},
    {id : 4, title : "Album 4", image : "Images/Album 4.png", price : 20, quantity : 1},
    ]

let cartItems = []

let shopContainer = document.querySelector(".shop-items")
let cartContainer = document.querySelector(".cart-items")
let totalAmount = document.querySelector(".cart-total-price")

shopItems.forEach(function (productItem) {

    let shopItem = document.createElement("div")
    shopItem.classList.add("shop-item")
    shopContainer.appendChild(shopItem)

    let shopTitle = document.createElement("span")
    shopTitle.classList.add("shop-item-title")
    shopTitle.textContent = productItem.title
    shopItem.appendChild(shopTitle)

    let shopImage = document.createElement("img")
    shopImage.classList.add("shop-item-image")
    shopImage.src = productItem.image
    shopItem.appendChild(shopImage)

    let shopDetails = document.createElement("div")
    shopDetails.classList.add("shop-item-details")
    shopItem.appendChild(shopDetails)

    let shopPrice = document.createElement("span")
    shopPrice.classList.add("shop-item-price")
    shopPrice.textContent = productItem.price + " $"
    shopDetails.appendChild(shopPrice)

    let btnShop = document.createElement("button")
    btnShop.className = "btn btn-primary shop-item-button"
    btnShop.type = "button"
    btnShop.textContent = "ADD TO CART"
    shopDetails.appendChild(btnShop)

    btnShop.addEventListener("click",function (productId) {

        const userId = shopItems.find(function (user) {
            return user.id === productItem.id
        })

        cartItems.push(userId)

        let cartRow = document.createElement("div")
        cartRow.classList.add("cart-row")
        cartContainer.appendChild(cartRow)

        let cartColumn = document.createElement("div")
        cartColumn.className = "cart-item cart-column"
        cartRow.appendChild(cartColumn)

        let cartImage = document.createElement("img")
        cartImage.classList.add("cart-item-image")
        cartImage.src = userId.image
        cartColumn.appendChild(cartImage)

        let cartTitle = document.createElement("span")
        cartTitle.classList.add("cart-item-title")
        cartTitle.textContent = userId.title
        cartColumn.appendChild(cartTitle)

        let cartPrice = document.createElement("span")
        cartPrice.className = "cart-price cart-column"
        cartPrice.textContent = " $" + userId.price
        cartRow.appendChild(cartPrice)

        let cartQuantity = document.createElement("div")
        cartQuantity.className = "cart-quantity cart-column"
        cartRow.appendChild(cartQuantity)

        let cartInput = document.createElement("input")
        cartInput.classList.add("cart-quantity-input")
        cartInput.type = "number"
        cartInput.value = "1"
        cartQuantity.appendChild(cartInput)
        cartQuantity.addEventListener("change",function () {
            userId.quantity = cartInput.value
            updateCartTotal()
        })

        let cartBtn = document.createElement("button")
        cartBtn.className = "btn btn-danger"
        cartBtn.type = "button"
        cartBtn.textContent = "REMOVE"
        cartQuantity.appendChild(cartBtn)
        cartBtn.addEventListener("click", function () {
            cartRow.remove()
            cartItems = cartItems.filter(function (items) {
                return items.id !== userId.id
            })
            updateCartTotal()
        })

        updateCartTotal()
    })
})

function updateCartTotal() {
    let sum = 0
    for (let i = 0; i < cartItems.length; i++) {

        sum += (cartItems[i].quantity) * (cartItems[i].price)
    }
    totalAmount.textContent = sum + " $"
}