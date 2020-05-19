import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {loadOrders} from '../../store/orders'
import {loadProducts} from '../../store/allProducts'

const Orders = ({orders, getOrders, loadProds, products}) => {
  useEffect(() => {
    getOrders()
    loadProds()
  }, [])
  //console.log(`prods -`, products)
  return orders && orders.map ? (
    <div>
      Previous Orders
      {orders.map(order => {
        return products && products.map ? (
          <div key={order.id}>
            <div>Order Number: {order.id}</div>
            <div>Placed on: {order.createdAt}</div>
            <div>
              Items Purchased
              {order.orders_products.map(product => {
                //console.log(product)
                return (
                  <ul key={product.id}>
                    {/* <li>Item: {products.find( prod => prod.id === product.productId).name}</li> */}
                  </ul>
                )
              })}
            </div>
          </div>
        ) : null
      })}
    </div>
  ) : null
}

const mapState = ({orders, products}) => ({
  orders,
  products
})

const mapDispatch = dispatch => ({
  loadProds: () => dispatch(loadProducts()),
  getOrders: () => dispatch(loadOrders())
})

export default connect(mapState, mapDispatch)(Orders)
