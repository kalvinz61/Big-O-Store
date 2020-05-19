import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {loadOrders} from '../../store/orders'
import {loadProducts} from '../../store/allProducts'

const _Orders = ({orders, products, loadAll}) => {
  useEffect(() => {
    loadAll()
  }, [])

  return (
    <div>
      <h2>Past Orders</h2>
      <ul>
        {orders &&
          orders.map(order => (
            <li key={order.id}>
              <div>
                <label>Order ID:</label>
                {order.id}
              </div>
              <div>
                <label>Shipping address:</label>
                {order.shippingAddress}
              </div>
              <div>
                <label>Payment method:</label>
                {order.payment}
              </div>
              <div>
                <label>Order Total:</label>
                {order.total}
              </div>
              <div>
                <label>Products ordered:</label>
                <ul>
                  {order.products.map(product => {
                    const {quantity} = product.orders_products
                    return (
                      <li key={product.id}>
                        {product.name}
                        <div>Price: {product.price}</div>
                        <div>Quantity: {quantity}</div>
                        <img src={product.imageUrl} />
                      </li>
                    )
                  })}
                </ul>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadAll() {
      console.log('loading')
      dispatch(loadOrders())
      dispatch(loadProducts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(_Orders)
