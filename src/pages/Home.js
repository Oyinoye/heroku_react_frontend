import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { productState } from "../atoms/productAtom";
import "./Home.css";
import { jwtState } from "../atoms/jtwAtom";
import { userState } from "../atoms/userAtom";
import { useHistory } from "react-router";
import deleteIcon from "../assets/delete.svg";
import { userdetailState } from "../atoms/userdetailAtom";

export default function Home() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [id, setId] = useState('');
  const [purchased, setPurchased] = useState(false);
  const [products, setProducts] = useRecoilState(productState);
  const [details, setDetails] = useRecoilState(userdetailState);
  const baseUrl = "http://127.0.0.1:8000";

  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addmodal, setAddmodal] = useState(false);
  const [clicked, setClicked] = useState(false);
  const token = useRecoilValue(jwtState);

 

  const openModal = () => {
    setIsOpen(!isOpen);
  };
  const addModal = () => {
    setAddmodal(!addmodal);
  };
  const history = useHistory();
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const user = useRecoilValue(userState);

  function login() {
    history.push("/login");
  }

  function logout() {
    setCurrentUser("");
  }

  console.log(id)

  function update(e){
    console.log(token)
     e.preventDefault();
      axios
        .put(
          `${id}`,
          {
            name: name,
            description: desc,
            quantity: quantity,
            is_purchased: purchased
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        )
        .then(openModal)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err.message));
  }


  function addToList() {
    axios.post(
        `${baseUrl}/api/v1/groceries/`,
        {
          name: name,
          description: desc,
          quantity: quantity,
          is_purchased: purchased
        },
        {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        }
      )
      .then((res) => setAddmodal(!addmodal))
      .then((res) => setClicked(!clicked))
      .catch((err) => console.log(err.message));
  }

 
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/users/${user.user_id}`,  {
        headers: {
          Authorization: ` Bearer ${token}`,
          
        }
      })
      .then((res) => setDetails(res.data))
      .catch((err) => console.log(err.message));
  }, []);


  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/groceries/`,  {
        headers: {
          Authorization: ` Bearer ${token}`,
        }
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err.message));
  }, [setProducts, token, isOpen, clicked]);



  return (
    <div className="home__main">
      <div className="home__container">
        <div className="home__left">
          <div className="bio"><h2>Welcome, {details.first_name}</h2></div>
          <div className="icon">G.O</div>
          <div className="title">Grocery App List</div>
          <div className="desc">
            Start planning on our amazing application. Never run out of your
            favourite groceries ever again! Rideco grocery app is here for you.
          </div>
        </div>
        <div className="home__right">
          <div className="header">
            {user?.user_id ? (
              <button className="form__btn" onClick={logout}>
                logout
              </button>
            ) : (
              <button className="form__btn" onClick={login}>
                login
              </button>
            )}
          </div>
          {user?.user_id ? 
            <div className="addtobtn">
              <button className="form__btn" onClick={addModal}>
                Add to List
              </button>
            </div>
           : 
            <h3>Please login to edit your list</h3>
          }
          <div className="classic">
            {products.map((product) => (
              <>
                <div className="main__product">
                  <div
                    className="product__body"
                    key={product.id}
                    onClick={() => setId(product.url)}
                  >
                    <div className="product__container" onClick={openModal}>
                      <div className="product__image">
                        <p>{product.quantity}</p>
                      </div>
                      <div className="product__details">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                      </div>
                      <div className="product__status">{product.is_purchased ? <p>Purchased</p> : <p>Not yet purchased</p>}</div>
                    </div>
                  </div>
                  <button className="delete" onClick={() => {
                        axios
                          .delete(
                            `${product.url}`,
                           
                            {
                              headers: {
                                Authorization: ` Bearer ${token}`,
                                "Content-Type": "application/json",
                              },
                            }
                          )
                          .then((res) => {
                            setClicked(!clicked)
                            console.log(res.data);
                          })
                          .catch((err) => console.log(err.message));
                      }}>
                    <img
                      src={deleteIcon}
                      alt="delete button"
                      width="30px"
                      height="30px"
                    />
                  </button>
                </div>

                {/* Modal For products */}

                {user?.user_id ? 
                  isOpen ? 
                    <div className="popup">
                      <div className="popup__body">
                        <div className="close" onClick={openModal}>
                          X
                        </div>
                        <div className="popup__form">
                          <div className="form__body">
                            <div className="form__input">
                              <label htmlFor=""> Name</label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder={product.name}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                            <div className="form__input">
                              <label htmlFor=""> Description</label>
                              <input
                                type="text"
                                name="description"
                                id="description"
                                placeholder={product.description}
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                              />
                            </div>
                            <div className="form__input">
                              <label htmlFor=""> Quantiy </label>
                              <input
                                  type="number"
                                  name="quantity"
                                  id="quantity"
                                  placeholder={product.quantity}
                                  value={quantity}
                                  onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>

                            
                              <div className="form__input">
                                <label htmlFor=""> Purchased</label>
                                <input
                                  type="checkbox"
                                  name="purchase"
                                  id="purchase"
                                  value={purchased}
                                  checked={purchased}
                                  onChange={() => setPurchased(!purchased)}
                                />
                              </div>
                              <div className="popup__button">
                                <button
                                  className="form__btn"
                                  onClick={update}
                                >
                                  update
                                </button>
                              </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                   : 
                    ""
                  
                 : 
                  ""
                }

                {/* Modal for saving */}

             
              </>
            ))}
          </div>
        </div>
      </div>
         {addmodal ? 
                  <div className="popup">
                  <div className="popup__body">
                    <div className="close" onClick={addModal}>
                      X
                    </div>
                    <div className="popup__form">
                      <div className="form__body">
                        <div className="form__input">
                          <label htmlFor=""> Name</label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="form__input">
                          <label htmlFor=""> Description</label>
                          <input
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Enter description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                          />
                        </div>
                        <div className="form__input">
                          <label htmlFor=""> Quantiy </label>
                          <input
                              type="number"
                              name="quantity"
                              id="quantity"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>

                        <>
                          <div className="form__input">
                            <label htmlFor=""> Purchased</label>
                            <input
                              type="checkbox"
                              name="purchase"
                              id="purchase"
                              value={purchased}
                              checked={purchased}
                              onChange={() => setPurchased(!purchased)}
                            />
                          </div>
                          <div className="popup__button">
                            <button
                              className="form__btn"
                              onClick={addToList}
                            >
                              Save
                            </button>
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                </div>
               : 
                ""
              }
    </div>
  );
}
