import Area from "../../../../../../../js/production/area.js";

function ItemOptions({options = []}) {
    if(options.length === 0)
        return null;
    const currency = ReactRedux.useSelector(state => _.get(state, 'appState.orderData.currency', 'USD'));

    return <div className="cart-item-options">
        <ul className="list-unstyled">
            {options.map((o, i) => {
                return <li key={i}>
                    <span className="option-name"><strong>{o.option_name} : </strong></span>
                    {o.values.map((v, k) => {
                        const _extraPrice = new Intl.NumberFormat('en', { style: 'currency', currency: currency }).format(v.extra_price);
                        return <span key={k}><i className="value-text">{v.value_text}</i><span className="extra-price">({_extraPrice})</span> </span>
                    })}
                </li>
            })}
        </ul>
    </div>
}

function ProductColumn({ name, sku, options = []}) {
    return <td>
        <div className="product-column">
            <div><span>{name}</span></div>
            <div><span>Sku</span>: <span>{sku}</span></div>
            <ItemOptions options={options}/>
        </div>
    </td>
}

export default function Items({items}) {
    const currency = ReactRedux.useSelector(state => _.get(state, 'appState.orderData.currency', 'USD'));
    return <div className="overflow-auto mt-4">
        <div className="sml-block">
            <div className="sml-block-title">Products</div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <Area
                            id="order_item_table_header"
                            noOuter={true}
                            coreWidgets={[
                                {
                                    component: "th",
                                    props : {children: <span>Product</span>, 'key': 'product'},
                                    sort_order: 10,
                                    id: "product"
                                },
                                {
                                    component: "th",
                                    props : {children: <span>Price</span>, 'key': 'price'},
                                    sort_order: 20,
                                    id: "price"
                                },
                                {
                                    component: "th",
                                    props : {children: <span>Qty</span>, 'key': 'qty'},
                                    sort_order: 30,
                                    id: "qty"
                                },
                                {
                                    component: "th",
                                    props : {children: <span>Total</span>, 'key': 'total'},
                                    sort_order: 40,
                                    id: "total"
                                }
                            ]}
                        />
                    </tr>
                </thead>
                <tbody>
                { items.map((i, k) => {
                    const _price = new Intl.NumberFormat('en', { style: 'currency', currency: currency }).format(i.product_price);
                    const _finalPrice = new Intl.NumberFormat('en', { style: 'currency', currency: currency }).format(i.final_price);
                    const _total = new Intl.NumberFormat('en', { style: 'currency', currency: currency }).format(i.total);
                    return <tr>
                        <Area
                            key={k}
                            id={"order_item_row_" + i.item_id}
                            noOuter={true}
                            item={i}
                            coreWidgets={[
                                {
                                    component: ProductColumn,
                                    props : {name: i.product_name, sku: i.product_sku, options: i.options},
                                    sort_order: 10,
                                    id: "product"
                                },
                                {
                                    component: "td",
                                    props : {children: [<div key={1}>{_price}</div>, <div key={2}>{_finalPrice}</div>], 'key': 'price'},
                                    sort_order: 20,
                                    id: "price"
                                },
                                {
                                    component: "td",
                                    props : {children: <span>{i.qty}</span>, 'key': 'qty'},
                                    sort_order: 30,
                                    id: "qty"
                                },
                                {
                                    component: "td",
                                    props : {children: <span>{_total}</span>, 'key': 'total'},
                                    sort_order: 40,
                                    id: "total"
                                }
                            ]}
                        />
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    </div>
}