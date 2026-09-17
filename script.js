const products=[
{name:"Denim Trousers",price:650,img:"images/denim-trousers.png",tag:"NEW"},
{name:"Grey Elegant Trousers",price:590,img:"images/grey-trousers.jpg",tag:"POPULAR"},
{name:"Light Grey Trousers",price:590,img:"images/light-grey-trousers.jpg",tag:"NEW"},
{name:"Blue Jeans",price:670,img:"images/blue-jeans.jpg",tag:"TRENDING"},
{name:"Off-Road T-Shirt",price:350,img:"images/off-road-tshirt.jpg",tag:"SALE"},
{name:"Fashion Collection",price:450,img:"images/fashion-item.png",tag:"FEATURED"}];
let cart=[],idx=0;
const carousel=document.getElementById("carousel");
function render(){carousel.innerHTML=products.map((p,i)=>`<article class="product"><img src="${p.img}" alt="${p.name}"><div class="product-body"><span class="badge">${p.tag}</span><h3>${p.name}</h3><div class="price">K${p.price.toFixed(2)}</div><button onclick="add(${i})">Add to Cart</button></div></article>`).join("")}
function slide(dir){idx=Math.max(0,Math.min(products.length-1,idx+dir));let w=carousel.querySelector(".product")?.getBoundingClientRect().width||270;carousel.style.transform=`translateX(-${idx*(w+18)}px)`}
function add(i){cart.push(products[i]);updateCart();toast(products[i].name+" added to cart");}
function updateCart(){document.getElementById("cartCount").textContent=cart.length;document.getElementById("cartItems").innerHTML=cart.length?cart.map(p=>`<div class="cart-line"><img src="${p.img}"><div><b>${p.name}</b><br>K${p.price.toFixed(2)}</div></div>`).join(""):"<p>Your cart is empty.</p>";document.getElementById("cartTotal").textContent="K"+cart.reduce((s,p)=>s+p.price,0).toFixed(2)}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("shade").classList.add("open")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("shade").classList.remove("open")}
function checkout(){if(!cart.length)return toast("Add a product first");toast("Checkout is ready for payment-gateway connection")}
function toast(t){let x=document.getElementById("toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),1800)}
function scrollToClothes(){document.getElementById("clothes").scrollIntoView({behavior:"smooth"})}
render();updateCart();
let startX=null;
carousel.addEventListener("pointerdown",e=>{startX=e.clientX;carousel.setPointerCapture(e.pointerId)});
carousel.addEventListener("pointerup",e=>{if(startX!==null){let d=e.clientX-startX;if(Math.abs(d)>45)slide(d<0?1:-1);startX=null}});
setInterval(()=>{if(idx>=products.length-1)idx=0;else idx++;slide(0)},5000);
