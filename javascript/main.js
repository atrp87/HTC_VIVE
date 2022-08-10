const cartItems = document.querySelector('.cart-table');
const cartTotal = document.querySelector('.cart-total');

const renderProducts = () => {
  products.forEach(product => {
    console.log(product.img)
    document.querySelector('.pricing-cards').innerHTML += `
      <div class="col-9 col-lg-4 col-xxl-3">
        <div class="card pricing-card border-0 bg-light text-center">
          <div class="p-3">
            <img class="img-fluid" src="${product.img}" alt="${product.series}">
          </div>
          <div class="card-body">
            <p class="lead card-title fw-bold vive-series">${product.series}</p>
            <p class="lead series-amount">£${product.amount}</p>
            <p class="card-text text-muted d-none d-lg-block">${product.description}</p>
            <button
              ${ /* addToCart ( onClick ) */''}
              onClick='addToCart(${product.id})'
              class="btn btn-info add-cart-btn btn-md mt-3"
              data-bs-toggle="modal"
              data-bs-target="#staticDrop"
              >Add to cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
};

renderProducts();

// RENDER CART
const renderCart = () => {
  cartItems.innerHTML = '';

  cart.forEach(item => {
    cartItems.innerHTML += `
      ${ /* ROW ID */''}
      <tr class="id-${item.id}">
        ${ /* PRODUCTS */''}
        <th scope="row" class="text-info">${item.series}</th>
        <td>
          ${ /* QUANTITY */''}
          <div class="d-flex align-items-center">
            <button onclick="updateUnitNumber('minus', ${item.id})" class="btn fs-4 fw-bold border-0 btn-sm" type="button">
                <i class="bi bi-dash text-light"></i>
            </button>
            <p class="fw-bold my-auto px-2">${item.productUnits}</p>
            <button onclick="updateUnitNumber('plus', ${item.id})" class="btn fs-4 fw-bold border-0 btn-sm" type="button">
              <i class="bi bi-plus text-light"></i>
            </button>
          </div>
        </td>
        <td class="border-top-1 fw-bold">
          ${ /* AMOUNT */''}
          <span class="product-total">
          £${item.amount}
          </span>
        </td>
        <td>
          ${ /* DELETE PRODUCT ( onClick ) */''}
          <button type="button" onclick='deleteFromCart(${item.id})' class="btn-close btn-close-white" aria-label="Close"></button>
        </td>
      </tr>
    `;
  });
};

// * UPDATE CART UNIT COUNTER ( product object)
const updateUnitNumber = (operation, id) => {
  cart = cart.map((item) => {
    let productUnits = item.productUnits;

    if (item.id === id) {
      if (operation === 'minus' && productUnits > 1) {
        // productUnits === 1 ? productUnits = 1 : productUnits--;
        productUnits--;
      } else if (operation === 'plus') {
        productUnits++;
      };
    };

    return {
      ...item,
      productUnits,
    };
  });

  updateCart();
};

const renderCartUnits = () => {
  document.querySelectorAll('.active-units').forEach(unitEl => {
    const unitsSum = cart.reduce(
      (prevVal, currVal) =>
        prevVal + currVal.productUnits,
      0,
    );
    if (unitsSum === 0) {
      unitEl.classList.add('d-none')
    } else {
      unitEl.classList.remove('d-none');
      unitEl.innerHTML = unitsSum;
    };
  });
};

// * CART TOTAL
const renderCartTotal = () => {
  let total = 0;

  cart.forEach(item => {
    total += item.amount * item.productUnits;
  });

  cartTotal.innerHTML = `£ ${total.toFixed(2)}`;
};


// * UPDATE CART
const updateCart = () => {
  renderCart();
  renderCartUnits();
  renderCartTotal();
  localStorage.setItem('shoppingCart', JSON.stringify(cart));
};

// * CART
// parse cart back to an array
let cart = JSON.parse(localStorage
  .getItem('shoppingCart'))
  // if nothing is in local storage set empty array
  || [];

updateCart();

// * ADD ITEM CART
const addToCart = id => {
  if (cart.some(item => item.id === id)) {
    console.log('Already in cart');
    // *  DISABLE BTN ?
    // document.querySelectorAll('.add-cart-btn').innerHTML = 'In cart'
  } else {
    const cartItem = products.find(product => product.id === id)
    //  add product units ( default 1 )
    cart.push({
      ...cartItem,
      productUnits: 1
    });
  };

  updateCart();
};

// * DELETE ITEM FROM CART 
const deleteFromCart = id => {
  // delete from products
  const cartItem = cart.map(item => {
    return item.id;
  }).indexOf(id);

  cart.splice(cartItem, 1);
  document.querySelector(`.id-${id}`).remove();

  updateCart();
};


// * ASIDE CART ( OBSERVER )
const sectionOne = document.querySelector('#intro');
const asideCart = document.querySelector('.aside-cart');

const objOptions = {
  root: null,
  threshold: 0,
  rootMargin: "-1px",
};

const heroSectionHandler = entries => {
  const [entry] = entries;

  if (entry.isIntersecting) {
    asideCart.classList.add('d-none');
  } else {
    asideCart.classList.remove("d-none");
    // * add animation @ intersecting ?
    // asideCart.style.translateX
  };
};

const sectionObserver = new IntersectionObserver(heroSectionHandler, objOptions);
sectionObserver.observe(sectionOne);


