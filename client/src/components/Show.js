import Button from "react-bootstrap/esm/Button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

//need to be styled to have no li styles showing no dotpoint

const handleAddToCart = (event) => {

}

const Show = () => {
    const [item, setItem] = useState(null)
    const { id } = useParams()
    useEffect(() => {
        const getItem = async () => {
          const res = await fetch(`/api/butcher/${id}`)
          const data = await res.json()
          setItem(data)
        }
        getItem()
      }, [id])

    return (
        <div className="item-show">
        
        <br />
        <h2> {item?.title} </h2>
        <img src={item?.imageURL} alt={item?.title}/>
        <div>
            <ul className="details-list">
                <li>${item?.price}</li>
                <li>{item?.description}</li>
                <li>{item?.category}</li>
                {item?.stock === 0 ? <li>Sorry, we have no stock remaining</li> : <li>We have {item?.stock} in stock!</li>} </ul> 
                <Button onClick={handleAddToCart} variant='outline-dark'>Add to Cart</Button>
        </div>
        </div>
    )
}

export default Show