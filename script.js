document.addEventListener("DOMContentLoaded",function(params) {
    document.getElementById("go-to-checkout").addEventListener("click",()=>{
        window.location.href="./checkout.html"
    })
    const addToCartButton=document.querySelectorAll(".add-to-cart")

    const deleteAll=document.getElementById("delete-all")

    deleteAll.addEventListener("click",()=>{
        localStorage.removeItem("sebet")
        const cartItems=document.getElementById("cart-items")
        cartItems.innerText="Empty"
        document.getElementById("total-price").innerText="0"
        UpdateCartCount()
    })

    

    addToCartButton.forEach((button)=>{
        button.addEventListener("click",(e)=>{
            const card=e.target.closest(".card")
            console.log(card);
            const product={
                id:card.dataset.id,
                image:card.querySelector("img").src,
                title:card.querySelector("h3").innerText,
                price:parseFloat(card.querySelector("p").innerText.replace('$','')),
                quantity:1
            }

            addToCart(product)
            DisplayCart()
            
        })
    })

    function addToCart(addproduct) {
        
        let cart=JSON.parse(localStorage.getItem("sebet")) || [] //eger localda cart varsa getir yoxdursa bos array dondur
        const existingProductIndex=cart.findIndex((product)=>product.id===addproduct.id)

        if(existingProductIndex > -1){
            cart[existingProductIndex].quantity+=1
        }
        else{
            cart.push(addproduct)
        }

        localStorage.setItem("sebet",JSON.stringify(cart))
        UpdateCartCount()
       
    }

    function DisplayCart() {
        
        let cart=JSON.parse(localStorage.getItem("sebet")) || []

        const cartItems=document.getElementById("cart-items")
        cartItems.innerHTML=''

        cart.forEach((product)=>{

           const pro=document.createElement("div")
           pro.innerHTML=`<div class="cartProduct" data-id=${product.id}><img class="cartImage" src=${product.image} alt="Mercedes"> ${product.title}-${product.quantity} eded -Price: ${(product.quantity*product.price).toFixed(2)} <i class="fa-solid fa-trash delete-product" ></i></div>`
            cartItems.appendChild(pro)
        })

        const totalPrice=cart.reduce((toplam,item)=>toplam+(item.price*item.quantity),0)
        document.getElementById("total-price").textContent=totalPrice.toFixed(2)


        const deleteProduct=document.querySelectorAll(".delete-product")

        deleteProduct.forEach(delPro=>{
        
            delPro.addEventListener("click",(e)=>{
                const card=e.target.closest(".cartProduct")
                console.log(card);
                const productId=card.dataset.id
                RemoveProduct(productId)
                
            })
        })
    }


    function RemoveProduct(productID) {
            const cart=JSON.parse(localStorage.getItem("sebet")) || []
            const updateCart=cart.filter(item=>item.id !==productID)

            localStorage.setItem("sebet",JSON.stringify(updateCart))
            UpdateCartCount()
            DisplayCart()


    }

    function UpdateCartCount() {
        
        const cart=JSON.parse(localStorage.getItem("sebet")) || []

        const totalCount=cart.reduce((toplam,item)=>toplam+item.quantity,0)

        document.getElementById("cart-count").innerText=totalCount
    }

    UpdateCartCount()
    DisplayCart()
})

