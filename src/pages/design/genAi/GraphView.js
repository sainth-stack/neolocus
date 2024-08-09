import { Grid, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
/*  */
import leftImage from "../../../assets/images/neolocus/living.png";
import living from "../../../assets/images/neolocus/living.png";
import bedroom from "../../../assets/images/neolocus/bedroom.png";
import modern from "../../../assets/images/neolocus/modern.png";
import minimal from "../../../assets/images/neolocus/minimal.png";
import contemporary from "../../../assets/images/neolocus/contempary.png";
import traditional from "../../../assets/images/neolocus/traditional.png";
import industrial from "../../../assets/images/neolocus/industrial.png";

import olive from "../../../assets/images/neolocus/colors/olive.png";
import charcol from "../../../assets/images/neolocus/colors/charcol.png";
import beige from "../../../assets/images/neolocus/colors/beige.png";
import warm from "../../../assets/images/neolocus/colors/warm.png";
import historical from "../../../assets/images/neolocus/colors/historical.png";

import axios from "axios";
import VerticalSlider from "./stepper";
import "./Main.css";
import LinearWithValueLabel from "../../../components/loader/index";
import { baseURL } from "../../../components/NavbarV2";
import "./styles.css";
const GraphView = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [search, setSearch] = useState("");
  const [question, setQuestion] = useState([]);
  const handleSend = () => {
    const updatedata = [
      ...question,
      {
        question: search,
        answer: true,
      },
    ];
    setQuestion(updatedata);
    handleGetAnswer(updatedata);
    setSearch("");
  };

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [img, setImage] = useState();
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const [data, setData] = useState({
    selected_style: "",
    selected_room_color: "",
    selected_room_type: "",
    number_of_room_designs: "",
    additional_instructions: "",
  });

  const inData = {
    roomImage: "",
    room: "living room",
    style: "",
    color: "",
    count: "",
  };

  const [selData, setSelData] = useState(inData);

  const handleChange = ({ target: { name, value } }) => {
    let updatedData = { ...data };
    updatedData[name] = value;
    setData(updatedData);
  };

  const [imgsLoaded, setImgsLoaded] = useState(false);
  const [design, setDesign] = useState(false);
  useEffect(() => {
    if (img !== null) {
      const loadImage = (image) => {
        return new Promise((resolve, reject) => {
          const loadImg = new Image();
          loadImg.src = image;
          // wait 2 seconds to simulate loading time
          loadImg.onload = () =>
            setTimeout(() => {
              resolve(image);
            }, 2000);

          loadImg.onerror = (err) => reject(err);
        });
      };

      Promise.all([loadImage(img)]) // Wrap the promise in an array
        .then(() => setImgsLoaded(true))
        .catch((err) => console.log("Failed to load images", err));
    }
  }, [img]);

  const sendEmailToUser = async (url) => {
    var formData = new FormData();
    const updatedData = {
      selected_style: selData.style,
      selected_room_color: selData.color,
      selected_room_type: selData?.room,
      number_of_room_designs: selData?.count,
      additional_instructions: data?.additional_instructions,
    };
    Object.entries(updatedData).forEach(([key, value]) =>
      formData.append(key, value)
    );
    formData.append("image_url", url);
    formData.append("email", localStorage.getItem("email"));
    formData.append("username", localStorage.getItem("username"));

    try {
      const response = await axios.post(`${baseURL}/sendEmail`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // token:localStorage.getItem('token')
        },
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleUpload2 = (img) => {
    console.log(img);
    window.open(img, "_blank");
  };

  const handleUpload = async () => {
    var formData = new FormData();
    setDesign(true);
    formData.append("selected_style", selData?.style);
    formData.append("selected_room_type", selData?.room);
    formData.append("selected_room_color", selData?.color);
    formData.append("number_of_room_designs", selData?.count);
    formData.append("additional_instructions", "");
    formData.append("user_name", localStorage.getItem("username"));

    setLoading(true);
    setImgsLoaded(false);
    setImage(null);
    try {
      const response = await axios.post(`${baseURL}/getImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response?.data?.image === "NA") {
        setImgsLoaded(true);
      } else {
        setImage(response?.data?.image);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setImgsLoaded(true);
      console.log(err);
    }
  };

  const handleGetAnswer = async (updatedata) => {
    var formData = new FormData();
    formData.append("msg", search);

    try {
      await axios
        .post(`http://3.132.248.171:5500/getResult`, formData)
        .then((res) => {
          console.log(res.data.graph);
          const finalData = updatedata.map((item) => {
            if (item.answer === true) {
              return {
                ...item,
                answer: res.data.graph,
              };
            } else {
              return item;
            }
          });
          setQuestion(finalData);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const steps = [
    {
      label: "Step 1",
      id: 1,
      type: "room",
      selected: "",
      list: [
        { text: "living room", image: living },
        { text: "bedroom", image: bedroom },
      ],
    },
    {
      label: "Step 2",
      id: 2,
      type: "style",
      selected: "",
      list: [
        { text: "modern", image: modern },
        { text: "minimal", image: minimal },
        { text: "contemporary", image: contemporary },
        { text: "traditional", image: traditional },
        { text: "industrial", image: industrial },
      ],
    },
    {
      label: "Step 3",
      id: 3,
      type: "color",
      selected: "",
      list: [
        { text: "olive", image: olive },
        { text: "charcol", image: charcol },
        { text: "beige", image: beige },
        { text: "warm earth", image: warm },
        { text: "historical romance", image: historical },
      ],
    },
    {
      label: "Step 4",
      id: 4,
      type: "count",
      selected: "",
      list: [
        { color: "rgb(153, 204, 255)", text: 1 },
        { color: "rgb(52, 136, 200)", text: 3 },
        { color: "rgb(200, 153, 255)", text: 2 },
        { color: "rgb(136, 52, 200)", text: 4 },
        { color: "rgb(255, 204, 153)", text: 5 },
        { color: "rgb(200, 136, 52)", text: 6 },
        { color: "rgb(153, 255, 204)", text: 7 },
        { color: "rgb(52, 200, 136)", text: 8 },
      ],
    },
  ];

  const handleSelectImage = (item, type) => {
    const updata = { ...selData };
    if (type == "room") {
      updata["roomImage"] = item?.image;
    }
    updata[type] = item.text;
    setSelData(updata);
  };

  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  const handleReset = () => {
    setDesign(false);
    setImgsLoaded(false);
    setLoading(false);
    setActiveStep(0);
    setSelData(inData);
  };

  const getDisabled = (step) => {
    console.log(selData);
    if (step == 1) {
      return selData.style ? false : true;
    } else if (step == 2) {
      return selData.color ? false : true;
    } else if (step == 3) {
      return selData.count ? false : true;
    } else return false;
  };
  return (
    <Grid>
      {!design && (
        <Grid
          md={5}
          sx={{ display: "flex", padding: "40px 40px" }}
          className="items_container"
        >
          <img
            className="main_image"
            src={selData?.roomImage ? selData?.roomImage : leftImage}
            // width={"40%"}
            style={{
              borderRadius: "10px",
              marginTop: "4rem",
              height: isSmallScreen ? "400px" : "600px",
            }}
            alt="name"
          />
          <Grid
            style={{
              width: "250px",
              marginLeft: "100px",
              marginTop: "5rem",
              display: "flex",
              justifyContent: "center",
            }}
            className="slider"
          >
            {!isSmallScreen && (
              <div className="slide">
                <VerticalSlider {...{ activeStep, steps }} />
              </div>
            )}
          </Grid>
          <Grid
            md={5}
            //marginTop={90}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
            className="right_side"
          >
            <div
              style={{ height: "500px", textAlign: "center" }}
              className="items"
            >
              {steps.map((item) => {
                if (item.id === activeStep + 1) {
                  const isSelected = Object.keys(selData).filter(
                    (key) => key === item.type
                  );
                  const data = selData[isSelected];
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        marginTop: "2rem",
                      }}
                      className="right_side_items"
                    >
                      <span className="step-text">{item?.label}</span>
                      <span className="step-text">
                        Choose your {item?.type}
                      </span>
                      <div style={{ width: "500px" }}>
                        <div
                          style={{
                            display: "flex",
                            gap: "20px",
                            marginTop: "10px",
                            maxWidth: "100%",
                            overflowX: "auto",
                          }}
                        >
                          {item.list?.map((itemc, index) => {
                            return (
                              <>
                                <div
                                  key={index}
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                    cursor: "pointer",
                                    position: "relative",
                                  }}
                                  onClick={() =>
                                    handleSelectImage(itemc, item?.type)
                                  }
                                >
                                  {item.type === "count" ? (
                                    <div
                                      style={{
                                        background: itemc.color,
                                        fontSize: "20px",
                                        textAlign: "center",
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "10px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer",
                                      }}
                                      onClick={() =>
                                        handleSelectImage(itemc, item?.type)
                                      }
                                    >
                                      {itemc.text}
                                    </div>
                                  ) : (
                                    <img
                                      src={itemc?.image}
                                      alt=""
                                      width={100}
                                      height={100}
                                      style={{ borderRadius: "10px" }}
                                    />
                                  )}
                                  {data === itemc.text && (
                                    <div
                                      style={{
                                        position: "absolute",
                                        width: "100%",
                                        textAlign: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: "100px",
                                          height: "100px",
                                          margin: "1%",
                                          backgroundColor: "green",
                                          opacity: "0.4",
                                          borderRadius: "8px",
                                        }}
                                      ></div>
                                      <div
                                        style={{
                                          color: "white",
                                          fontSize: "24px",
                                          padding: "4px",
                                          zIndex: 1,
                                          marginTop: "-35px",
                                          marginLeft: "-70px",
                                        }}
                                      >
                                        ✓
                                      </div>
                                    </div>
                                  )}
                                  {item.type !== "count" && itemc.text}
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>

            <div style={{ display: "flex", gap: "40px" }} className="btns">
              <button
                className="back-button-text btn"
                onClick={() => prevStep()}
              >
                BACK
              </button>
              <button
                className="next-button-text btn"
                disabled={getDisabled(activeStep)}
                style={{ opacity: getDisabled(activeStep) ? 0.5 : 1 }}
                onClick={() => (activeStep < 3 ? nextStep() : handleUpload())}
              >
                {activeStep > 2 ? "Generate" : "NEXT"}
              </button>
            </div>
          </Grid>
        </Grid>
      )}

      {design && (
        <Grid
          item
          md={7}
          padding={"10px"}
          sx={{
            width: "100%",
            height: "88vh",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading || !imgsLoaded ? (
            <LinearWithValueLabel loading={loading || !imgsLoaded} />
          ) : (
            <div>
              {/* <h2>Deisgn</h2> */}
              {img !== null && imgsLoaded && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <img src={img} alt="new" style={{ width: "100%" }} />
                  <div style={{ display: "flex", gap: "5px" }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        sendEmailToUser(img);
                      }}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px",
                        width: "fit-content",
                      }}
                    >
                      Email Me
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleUpload2(img);
                      }}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px",
                        width: "fit-content",
                      }}
                    >
                      Download
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        //handleReset();
                      }}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px",
                        width: "fit-content",
                      }}
                    >
                      Generate New Design
                    </button>
                  </div>
                </div>
              )}
              {img === null && imgsLoaded && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Please Try Again in some time
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleReset();
                    }}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                      width: "fit-content",
                    }}
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default GraphView;
