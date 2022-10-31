import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import CarouselContainer from './Carousel'
import { Link } from 'react-router-dom'

const Catalogue = ({ items }) => {
    return (
        <>
        {/* set the columns of row according to screen size */}
        <Row xs={2} md={2} lg={3} xl={4} className='g-3'>
            {items.map((item) => {
                return (
                    <Col key={item._id} >
                        {/* set the height of card to 100px */}
                        <Card className='h-100 border-0 rounded-0' key={item._id}>
                            {/* displays item.image if an imageURL exists */}
                            {item.imageURL && (
                                <Link to={`/api/butcher/${item._id}`}>
                                <Card.Img className='h-100 rounded-0'
                                    variant='top'
                                    src={item.imageURL ? item.imageURL : ''}
                                    alt={item.title}
                                    style={{
                                        objectFit: 'cover',
                                    }}
                                />
                                </Link>
                            )}
                            <Card.Body className='text-center'>
                                {/* display a message when image is unavailable */}
                                {item.imageURL ? (
                                    ''
                                ) : (
                                    <Card.Title>No Image Available</Card.Title>
                                )}
                                {/* display title of the item */}
                                <Card.Text className='lead'>{item.title}</Card.Text>
                                <Card.Text className='text-muted'>${item.price}</Card.Text>
                                {/* button for add to cart */}
                                    
                                <Button variant='outline-dark'>
                                    Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            })}
        </Row>
        </>

    )
}

export default Catalogue