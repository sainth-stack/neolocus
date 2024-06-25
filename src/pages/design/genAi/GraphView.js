import { Grid } from "@mui/material"
import { useEffect, useState } from "react";
import leftImage from '../../../assets/images/neolocus/living.png'
import living from '../../../assets/images/neolocus/living.png'
import bedroom from '../../../assets/images/neolocus/bedroom.png'
import modern from '../../../assets/images/neolocus/modern.png'
import minimal from '../../../assets/images/neolocus/minimal.png'
import contemporary from '../../../assets/images/neolocus/contempary.png'
import traditional from '../../../assets/images/neolocus/traditional.png'
import industrial from '../../../assets/images/neolocus/industrial.png'

import olive from '../../../assets/images/neolocus/colors/olive.png'
import charcol from '../../../assets/images/neolocus/colors/charcol.png'
import beige from '../../../assets/images/neolocus/colors/beige.png'
import warm from '../../../assets/images/neolocus/colors/warm.png'
import historical from '../../../assets/images/neolocus/colors/historical.png'

import axios from "axios";
import VerticalSlider from './stepper'
import './Main.css'
import LinearWithValueLabel from "../../../components/loader/index";
const GraphView = () => {
    const [search, setSearch] = useState('')
    const [question, setQuestion] = useState([
    ])
    const handleSend = () => {
        const updatedata = [...question, {
            question: search,
            answer: true,
        }]
        setQuestion(updatedata)
        handleGetAnswer(updatedata)
        setSearch('')
    }


    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [img, setImage] = useState(null)
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };


    const [data, setData] = useState({
        selected_style: '',
        selected_room_color: "",
        selected_room_type: "",
        number_of_room_designs: '',
        additional_instructions: ""
    })
    const handleChange = ({ target: { name, value } }) => {
        let updatedData = { ...data };
        updatedData[name] = value;
        setData(updatedData);
    };

    const [imgsLoaded, setImgsLoaded] = useState(false)
    const [design, setDesign] = useState(false)
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

    const handleUpload = async () => {
        var formData = new FormData();
        setDesign(true)
        formData.append('selected_style', selData?.style);
        formData.append('selected_room_type', selData?.room);
        formData.append('selected_room_color', selData?.color);
        formData.append('number_of_room_designs', selData?.count);
        formData.append('additional_instructions', "");
        setLoading(true)
        setImgsLoaded(false)
        setImage(null)
        try {
            const response = await axios.post(
                `http://3.132.248.171:4500/getImage`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            setLoading(false)
            setImage(response?.data?.image)
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    const handleGetAnswer = async (updatedata) => {
        var formData = new FormData();
        formData.append('msg', search);

        try {
            await axios.post(`http://3.132.248.171:5500/getResult`, formData)
                .then(res => {
                    console.log(res.data.graph)
                    const finalData = updatedata.map((item) => {
                        if (item.answer === true) {
                            return {
                                ...item,
                                answer: res.data.graph
                            }
                        } else {
                            return item
                        }
                    })
                    setQuestion(finalData)
                })
        } catch (err) {
            console.log(err)
        }
    }

    const data1 = [
        { label: 'Select', value: '' },
        { label: 'Living Room', value: 'Livingroom' },
        { label: 'Bed Room', value: 'Bedroom' },
    ]

    const data2 = [
        { label: 'Select', value: '' },
        { label: 'Red', value: 'Red' },
        { label: 'Brown', value: 'Brown' },
        { label: 'Green', value: 'Green' }
    ]

    const data3 = [
        { label: 'Select', value: '' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' }
    ]

    const styleData = [
        { label: 'Select', value: '' },
        { label: 'Modern', value: 'Modern' },
        { label: 'Minimal', value: 'Minimal' },
        { label: 'contemporary', value: 'contemporary' },
        { label: 'traditional', value: 'traditional' }
    ]

    const inData = {
        roomImage: "",
        room: 'living room',
        style: "",
        color: '',
        count: ''
    }

    const [selData, setSelData] = useState(inData)


    const steps = [
        {
            label: 'Step 1', id: 1, type: "room", selected: "", list: [
                { text: 'living room', image: living },
                { text: 'bedroom', image: bedroom }
            ]
        },
        {
            label: 'Step 2', id: 2, type: 'style', selected: "", list: [
                { text: 'modern', image: modern },
                { text: 'minimal', image: minimal },
                { text: 'contemporary', image: contemporary },
                { text: 'traditional', image: traditional },
                { text: 'industrial', image: industrial }

            ]
        },
        {
            label: 'Step 3', id: 3, type: 'color', selected: "", list: [
                { text: 'olive', image: olive },
                { text: 'charcol', image: charcol },
                { text: 'beige', image: beige },
                { text: 'warm earth', image: warm },
                { text: 'historical romance', image: historical }

            ]
        },
        {
            label: 'Step 4', id: 4, type: 'count', selected: "", list: [
                { color: 'rgb(153, 204, 255)', text: 1 },
                { color: 'rgb(102, 170, 229)', text: 2 },
                { color: 'rgb(72, 136, 200)', text: 3 }
            ]
        },
    ];

    const handleSelectImage = (item, type) => {
        const updata = { ...selData }
        if (type == "room") {
            updata["roomImage"] = item?.image
        }
        updata[type] = item.text
        setSelData(updata)
    }

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
        setSelData(inData)
    }

    return (
        <Grid>
            {!design && <Grid md={5} sx={{ display: 'flex', gap: '40px', padding: '40px 40px' }}>
                <img src={selData?.roomImage ? selData?.roomImage : leftImage} width={"40%"} height={'0%'} alt="image" style={{ borderRadius: '10px' }} />
                <Grid md={2} style={{ width: '250px', marginLeft: '100px' }}>
                    <VerticalSlider {...{ activeStep, steps }} />
                </Grid>
                <Grid md={5} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%'
                }}>
                    <div style={{ height: '500px' }}>
                        {steps.map((item) => {
                            if (item.id == activeStep + 1) {
                                const isSelected = Object.keys(selData).filter((key) => key === item.type)
                                const data = selData[isSelected]
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                                        <span className="step-text">{item?.label}</span>
                                        <span className="step-text">Choose your {item?.type}</span>
                                        <div style={{ width: '500px' }}>
                                            <div style={{ display: 'flex', gap: '20px', marginTop: '10px', maxWidth: '100%', overflowX: 'auto' }}>
                                                {item.list?.map((itemc, index) => {
                                                    return (
                                                        <>
                                                            <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '10px', cursor: 'pointer', position: 'relative' }} onClick={() => handleSelectImage(itemc, item?.type)}>
                                                                {item.type === "count" ? <div style={{ background: itemc.color, fontSize: '20px', textAlign: 'center', width: '100px', height: '100px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSelectImage(itemc, item?.type)}>{itemc.text}</div> :
                                                                    <img src={itemc?.image} alt="" width={100} height={100} style={{ borderRadius: '10px' }} />
                                                                }
                                                                {data === itemc.text && <div style={{ position: 'absolute', width: '100%', textAlign: 'center' }}>
                                                                    <div style={{ width: '100px', height: '100px', margin: '1%', backgroundColor: 'green', opacity: '0.4', borderRadius: '8px' }}></div>
                                                                    <div style={{ color: 'white', fontSize: '24px', padding: '4px', zIndex: 1, marginTop: '-35px', marginLeft: '-70px' }}>✓</div>
                                                                </div>}
                                                                {item.type !== 'count' && itemc.text}
                                                            </div>
                                                        </>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                )
                            }
                        })}
                    </div>

                    <div style={{ display: 'flex', width: '100%', gap: '40px' }}>
                        <button className="back-button-text" onClick={() => prevStep()}>
                            BACK
                        </button>
                        <button className="next-button-text" onClick={() => activeStep < 3 ? nextStep() : handleUpload()}>
                            {activeStep > 2 ? "Get Design" : "NEXT"}
                        </button>
                    </div>

                </Grid>
            </Grid >}

            <Grid item md={7} padding={"10px"} sx={{
                width: "100%",
                height: '88vh',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {(loading || !imgsLoaded) ? <LinearWithValueLabel loading={loading || !imgsLoaded} /> : <div>
                    {/* <h2>Deisgn</h2> */}
                    {(img !== null && imgsLoaded) &&
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                            <img
                                src={img}
                                alt="new"
                                style={{ width: '100%' }}
                            />
                            <button className="btn btn-primary" onClick={() => { handleReset() }} style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', width: 'fit-content' }}>Regenerate</button>
                        </div>

                    }
                </div>}
            </Grid>
        </Grid>
    )
}

export default GraphView;