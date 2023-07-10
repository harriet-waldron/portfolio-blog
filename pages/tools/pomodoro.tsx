// import React, { createContext, useEffect, useRef, useState } from 'react';
// import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

// const controllers = [
//   { label: 'Pomodoro', value: 'pomodoroTime' },
//   { label: 'Short Break', value: 'shortBreakTime' },
//   { label: 'Long Break', value: 'longBreakTime' },
// ];

// const stages = {
//   pomodoroTime: 25 * 60,
//   shortBreakTime: 5 * 60,
//   longBreakTime: 15 * 60,
//   isPaused: true,
//   period: 1,
// };

// const useCalculateTime = ({ pomodoro, selectedControl }) => {
//   const minutes = Math.floor(pomodoro[controllers[selectedControl].value] / 60);
//   const seconds = Math.floor(pomodoro[controllers[selectedControl].value] % 60);
//   return { minutes, seconds };
// };

// const useTimer = () => {
//   const [formData, setFormData] = useState({
//     pomodoroTime: stages.pomodoroTime / 60,
//     shortBreakTime: stages.shortBreakTime / 60,
//     longBreakTime: stages.longBreakTime / 60,
//   });
//   const [selectedControl, setSelectedControl] = useState(0);
//   const [pomodoro, setPomodoro] = useState(stages);
//   const periodId = useRef(stages.period);

//   const resetTimerValues = () => {
//     setPomodoro((prevPomodoro) => ({
//       ...prevPomodoro,
//       pomodoroTime: formData.pomodoroTime * 60,
//       shortBreakTime: formData.shortBreakTime * 60,
//       longBreakTime: formData.longBreakTime * 60,
//     }));
//   };


// const ModalInput = ({ label, defaultValue, name, formData, setFormData }) => {
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="form-group flex flex-col flex-auto">
//       <label htmlFor={name} className="text-xs font-bold text-pmd-blue-300 pb-1">
//         {label}
//       </label>
//       <input
//         className="settingsInput w-24 bg-pmd-blue-50 py-2 px-4 text-sm font-bold rounded-xl focus:outline-none"
//         min="1"
//         max="60"
//         type="number"
//         name={name}
//         defaultValue={defaultValue}
//         onChange={handleInputChange}
//       />
//     </div>
//   );
// };

// const Modal = ({ isSettingsOn, setIsSettingsOn, setPomodoro }) => {
//   const [formData, setFormData] = useState({
//     pomodoroTime: stages.pomodoroTime / 60,
//     shortBreakTime: stages.shortBreakTime / 60,
//     longBreakTime: stages.longBreakTime / 60,
//   });
//   const modalRef = useRef();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setPomodoro((prevPomodoro) => ({
//       ...prevPomodoro,
//       pomodoroTime: formData.pomodoroTime * 60,
//       shortBreakTime: formData.shortBreakTime * 60,
//       longBreakTime: formData.longBreakTime * 60,
//     }));
//     setIsSettingsOn(false);
//   };

//   const handleOutsideClick = (e) => {
//     if (modalRef.current && !modalRef.current.contains(e.target)) {
//       setIsSettingsOn(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleOutsideClick);

//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     };
//   }, []);

//   return (
//     <>
//       {isSettingsOn && (
//         <div className="block modal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[20rem] md:w-[28rem] rounded-2xl text-pmd-blue-800 px-6 pt-6 pb-12" ref={modalRef}>
//           <div className="flex pb-6 border-b justify-between items-center">
//             <h2 className="font-bold text-xl">Settings</h2>
//             <button onClick={() => setIsSettingsOn(false)}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           <div>
//             <h3 className="uppercase tracking-wider font-bold text-sm py-3">Time (minutes)</h3>

//             <form className="inputs flex" onSubmit={handleSubmit}>
//               <ModalInput
//                 label={'pomodoro'}
//                 name={'pomodoroTime'}
//                 defaultValue={formData.pomodoroTime}
//                 formData={formData}
//                 setFormData={setFormData}
//               />
//               <ModalInput
//                 label={'short break'}
//                 name={'shortBreakTime'}
//                 defaultValue={formData.shortBreakTime}
//                 formData={formData}
//                 setFormData={setFormData}
//               />
//               <ModalInput
//                 label={'long break'}
//                 name={'longBreakTime'}
//                 defaultValue={formData.longBreakTime}
//                 formData={formData}
//                 setFormData={setFormData}
//               />
//               <button
//                 type="submit"
//                 className="absolute -bottom-5 bg-pmd-red-700 text-white font-semibold text-sm rounded-full px-8 py-3 left-1/2 -translate-x-1/2 hover:bg-pmd-red-600 transition-all cursor-pointer"
//               >
//                 Apply
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };


//   const getRemainingTimePercentage = () => {
//     const totalTime = formData[controllers[selectedControl].value] * 60;
//     const remainingTime = pomodoro[controllers[selectedControl].value];
//     return (remainingTime / totalTime) * 100;
//   };

//   useEffect(() => {
//     let timer = null;
//     if (!pomodoro.isPaused) {
//       timer = setInterval(() => {
//         setPomodoro((prevPomodoro) => {
//           if (prevPomodoro[controllers[selectedControl].value] === 0) {
//             setSelectedControl((prevState) => {
//               if (periodId.current % 8 === 0) {
//                 return 2;
//               } else {
//                 return (prevState + 1) % controllers.length;
//               }
//             });

//             resetTimerValues();
//             clearInterval(timer);
//             periodId.current += 1;

//             return prevPomodoro;
//           }

//           return {
//             ...prevPomodoro,
//             [controllers[selectedControl].value]: prevPomodoro[controllers[selectedControl].value] - 1,
//           };
//         });
//       }, 1000);
//     }

//     return () => {
//       clearInterval(timer);
//     };
//   }, [pomodoro.isPaused, selectedControl]);

//   return { pomodoro, setPomodoro, selectedControl, setSelectedControl, resetTimerValues, getRemainingTimePercentage };
// };

// const ToggleButton = ({ pomodoro, setPomodoro }) => {
//   const togglePausePlay = () => {
//     setPomodoro((prevPomodoro) => ({
//       ...prevPomodoro,
//       isPaused: !prevPomodoro.isPaused,
//     }));
//   };

//   return (
//     <button onClick={togglePausePlay} className="text-base uppercase tracking-[0.5rem]">
//       {pomodoro.isPaused ? 'Pause' : 'Start'}
//     </button>
//   );
// };

// const TimeDisplay = ({ pomodoro, selectedControl }) => {
//   const { minutes, seconds } = useCalculateTime({ pomodoro, selectedControl });

//   return (
//     <>
//       {minutes < 10 ? '0' : ''}
//       {minutes}:{seconds < 10 ? '0' : ''}
//       {seconds}
//     </>
//   );
// };

// const Labels = ({ selectedControl, setSelectedControl, resetTimerValues, setPomodoro }) => {
//   const handleSelectedControl = (index) => {
//     setSelectedControl(index);
//     resetTimerValues();
//     setPomodoro((prevPomodoro) => ({
//       ...prevPomodoro,
//       isPaused: true,
//     }));
//   };

//   return (
//     <div>
//       <ul className="tw-infoContainer">
//         {controllers.map((controller, index) => (
//           <li
//             key={index}
//             className={`tw-infoItem ${selectedControl === index ? 'active' : ''}`}
//             onClick={() => handleSelectedControl(index)}
//           >
//             {controller.label}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };


// const App = () => {
//   const {
//     pomodoro,
//     selectedControl,
//     setPomodoro,
//     setSelectedControl,
//     resetTimerValues,
//     getRemainingTimePercentage,
//   } = useTimer();

//   const FormDataContext = createContext({});
//   const [isSettingsOn, setIsSettingsOn] = useState(false);
// // eslint-disable-next-line no-console
// console.log(isSettingsOn)
//   document.title = `${controllers[selectedControl].label} - ${pomodoro[selectedControl].minutes}:${pomodoro[selectedControl].seconds}`;

//   return (
//     <FormDataContext.Provider value={{ formData: pomodoro, setFormData: setPomodoro }}>
//       <main className="relative flex flex-col justify-center items-center">
//         <Labels
//           resetTimerValues={resetTimerValues}
//           selectedControl={selectedControl}
//           setSelectedControl={setSelectedControl}
//           setPomodoro={setPomodoro}
//         />
//         <Modal isSettingsOn={undefined} setIsSettingsOn={undefined} setPomodoro={undefined} />
//         <div className="tw-timer-container">
//           <div className="tw-timer">
//             <div className="flex flex-col justify-center items-center font-semibold relative">
//               <CircularProgressbarWithChildren
//                 strokeWidth={2}
//                 value={getRemainingTimePercentage()}
//                 styles={buildStyles({
//                   trailColor: 'transparent',
//                   pathColor: '#f87070',
//                 })}
//               >
//                 <TimeDisplay pomodoro={pomodoro} selectedControl={selectedControl} />
//                 <ToggleButton pomodoro={pomodoro} setPomodoro={setPomodoro} />
//               </CircularProgressbarWithChildren>
//             </div>
//           </div>
//         </div>
//         <button onClick={() => setIsSettingsOn(true)}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-8 h-8 m-6"
//           >
//             <path strokeLinejoin="round" strokeLinecap="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 0h3.75a1.5 1.5 0 013 0m-3 0a1.5 1.5 0 00-3 0m-3.75 0h9.75M10.5 18h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
//           </svg>
//         </button>
//       </main>
//     </FormDataContext.Provider>
//   );
// };

// export default App;



import React, { createContext, useEffect, useRef } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { useState } from 'react';


const controllers = [
  { label: "pomodoro", value: "pomodoroTime" },
  { label: "short break", value: "shortBreakTime" },
  { label: "long break", value: "longBreakTime" },
];

const stages = {
  pomodoroTime: 25 * 60,
  shortBreakTime: 5 * 60,
  longBreakTime: 15 * 60,
  isPaused: true,
  period: 1,
};


//  const FormDataContext = createContext({});

//  const FormDataProvider = ({ children }) => {
//   const [formData, setFormData] = useState({
//     pomodoroTime: stages.pomodoroTime / 60,
//     shortBreakTime: stages.shortBreakTime / 60,
//     longBreakTime: stages.longBreakTime / 60,
//   });
//   const value = {
//     formData,
//     setFormData,
//   };
//   return <FormDataContext.Provider value={value}>{children}</FormDataContext.Provider>;
// };


const useCalculateTime = ({ pomodoro, selectedControl }) => {
  const minutes = Math.floor(pomodoro[controllers[selectedControl].value] / 60);
  const seconds = Math.floor(pomodoro[controllers[selectedControl].value] % 60);
  return { minutes, seconds };
};


const useTimer = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [formData, setFormData] = useState({
        pomodoroTime: stages.pomodoroTime / 60,
        shortBreakTime: stages.shortBreakTime / 60,
        longBreakTime: stages.longBreakTime / 60,
      });
//   const { formData } = useContext(FormDataContext);
  const [selectedControl, setSelectedControl] = useState(0);
  const [pomodoro, setPomodoro] = useState(stages);
  const periodId = useRef(stages.period);
//   const Sound = () => {
//     const audio = new Audio(ring);
//     return audio.play();
//   };

  const resetTimerValues = () => {
    setPomodoro((prevPomodoro) => ({
      ...prevPomodoro,
      pomodoroTime: formData.pomodoroTime * 60,
      shortBreakTime: formData.shortBreakTime * 60,
      longBreakTime: formData.longBreakTime * 60,
    }));
  };

  const getRemainingTimePercentage = () => {
    const totalTime = formData[controllers[selectedControl].value] * 60;
    const remainingTime = pomodoro[controllers[selectedControl].value];
    return (remainingTime / totalTime) * 100;
  };

  useEffect(() => {
    let timer = null;
    if (!pomodoro.isPaused) {
      timer = setInterval(() => {
        setPomodoro((prevPomodoro) => {
          if (prevPomodoro[controllers[selectedControl].value] === 0) {
            setSelectedControl((prevState) => {
              if (periodId.current % 8 === 0) {
                return 2;
              } else {
                return prevState >= controllers.length - 1 ? 0 : prevState === 0 ? prevState + 1 : prevState === 1 ? prevState - 1 : 0;
              }
            });

            resetTimerValues();
            clearInterval(timer);
            // Sound();
            periodId.current += 1;

            return prevPomodoro;
          }
          return {
            ...prevPomodoro,
            [controllers[selectedControl].value]: prevPomodoro[controllers[selectedControl].value] - 1,
          };
        });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [pomodoro.isPaused, selectedControl, setPomodoro, setSelectedControl, pomodoro.period]);

  return { pomodoro, setPomodoro, selectedControl, setSelectedControl, resetTimerValues, getRemainingTimePercentage };
};


const ToggleButton = ({ pomodoro, setPomodoro }) => {
  function togglePausePlay() {
    setPomodoro((prevPomodoro) => {
      return {
        ...prevPomodoro,
        isPaused: !prevPomodoro.isPaused,
      };
    });
  }

  return (
    <button
      onClick={togglePausePlay}
      className="text-base uppercase tracking-[0.5rem]"
    >
      {pomodoro.isPaused ? 'Pause' : 'Start'}
    </button>
  );
};

const TimeDisplay = ({ pomodoro, selectedControl }) => {
  const { minutes, seconds } = useCalculateTime({ pomodoro, selectedControl });

  return (
    <>
      {minutes < 9 ? '0' : ''}
      {minutes}:{seconds < 9 ? '0' : ''}
      {seconds}
    </>
  );
};

const ModalInput = ({ label, defaultValue, onChange, name }) => {
  return (
    <div className="form-group flex flex-col flex-auto">
      <label
        htmlFor={name}
        className="text-xs font-bold text-pmd-blue-300 pb-1"
      >
        {label}
      </label>
      <input
        className="settingsInput w-24 bg-pmd-blue-50 py-2 px-4 text-sm font-bold rounded-xl focus:outline-none"
        min="1"
        max="60"
        type="number"
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
};



const Modal = ({ isSettingsOn, setIsSettingsOn, setPomodoro }) => {
  const [formData, setFormData] = useState({
    pomodoroTime: stages.pomodoroTime / 60,
    shortBreakTime: stages.shortBreakTime / 60,
    longBreakTime: stages.longBreakTime / 60,
  });
  const modalRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    setPomodoro((prevPomodoro) => ({
      ...prevPomodoro,
      pomodoroTime: formData.pomodoroTime * 60,
      shortBreakTime: formData.shortBreakTime * 60,
      longBreakTime: formData.longBreakTime * 60,
    }));
    setIsSettingsOn(false);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  // function handleOutsideClick() {
  //   if (modalRef.current 
  //     // && !modalRef.current.contains(e.target)
  //     ) {
  //     setIsSettingsOn(false);
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleOutsideClick);

  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   };
  // }, []);
  return (
    <>
      {isSettingsOn && (
        <div
          className={`block modal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[20rem] md:w-[28rem] rounded-2xl text-pmd-blue-800 px-6 pt-6 pb-12`}
          ref={modalRef}
        >
          <div className=" flex pb-6 border-b justify-between items-center">
            <h2 className="font-bold text-xl">Settings</h2>
            <button onClick={() => setIsSettingsOn(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div>
            <h3 className="uppercase tracking-wider font-bold text-sm py-3">
              Time (minutes)
            </h3>

            <form className="inputs flex" onSubmit={handleSubmit}>
              <ModalInput
                label={'pomodoro'}
                name={'pomodoroTime'}
                defaultValue={formData.pomodoroTime}
                // setFormData={setFormData}
                onChange={handleInputChange}
              />
              <ModalInput
                label={'short break'}
                name={'shortBreakTime'}
                defaultValue={formData.shortBreakTime}
                // setFormData={setFormData}
                onChange={handleInputChange}
              />
              <ModalInput
                label={'long break'}
                name={'longBreakTime'}
                defaultValue={formData.longBreakTime}
                // setFormData={setFormData}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="absolute -bottom-5 bg-pmd-red-700 text-white font-semibold text-sm rounded-full px-8 py-3 left-1/2 -translate-x-1/2 hover:bg-pmd-red-600 transition-all cursor-pointer"
              >
                Apply
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const Labels = ({
  selectedControl,
  setSelectedControl,
  resetTimerValues,
  setPomodoro,
}) => {
  function handleSelectedControl(index) {
    setSelectedControl(index);
    resetTimerValues();
    setPomodoro((prevPomodoro) => ({
      ...prevPomodoro,
      isPaused: true,
    }));
  }

  return (
    <div>
      <ul className="tw-infoContainer">
        {controllers.map((controller, index) => (
          <li
            key={index}
            className={`tw-infoItem ${selectedControl === index && 'active'}`}
            onClick={() => handleSelectedControl(index)}
          >
            {controller.label}
          </li>
        ))}
      </ul>
    </div>
  );
};



const App = () => {
  const {
    pomodoro,
    selectedControl,
    setPomodoro,
    setSelectedControl,
    resetTimerValues,
    getRemainingTimePercentage,
  } = useTimer();
  // const { minutes, seconds } = useCalculateTime({ pomodoro, selectedControl });
  const [isSettingsOn, setIsSettingsOn] = useState(false);

  const FormDataContext = createContext({});

  const [formData, setFormData] = useState({
    pomodoroTime: stages.pomodoroTime / 60,
    shortBreakTime: stages.shortBreakTime / 60,
    longBreakTime: stages.longBreakTime / 60,
  });
  const value = {
    formData,
    setFormData,
  };

  // document.title = `${controllers[selectedControl].label} - ${
  //   minutes < 9 ? '0' : ''
  // }${minutes}:${seconds < 9 ? '0' : ''}${seconds}`;

  return (
    <FormDataContext.Provider value={value}>
    <main className="relative flex flex-col justify-center items-center">
      <Labels
        resetTimerValues={resetTimerValues}
        selectedControl={selectedControl}
        setSelectedControl={setSelectedControl}
        setPomodoro={setPomodoro}
      />
      <div className="tw-timer-container">
        <div className="tw-timer">
          <div className="flex flex-col justify-center items-center font-semibold relative">
            <CircularProgressbarWithChildren
              strokeWidth={2}
              // trailColor="transparent"
              value={getRemainingTimePercentage()}
              styles={buildStyles({
                trailColor: 'transparent',
                pathColor: '#f87070',
              })}
            >
              <TimeDisplay
                pomodoro={pomodoro}
                selectedControl={selectedControl}
              />
              <ToggleButton pomodoro={pomodoro} setPomodoro={setPomodoro} />
            </CircularProgressbarWithChildren>
          </div>
        </div>
      </div>
      <button onClick={() => setIsSettingsOn(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 m-6 "
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>
      </button>
      <Modal
        isSettingsOn={isSettingsOn}
        setIsSettingsOn={setIsSettingsOn}
        setPomodoro={setPomodoro}
      />
    </main>
    </FormDataContext.Provider>
  );
};

export default App;

// @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap");

// @tailwind base;
// @tailwind components;
// @tailwind utilities;

// @layer base {
//   body {
//     @apply bg-pmd-blue-800 flex justify-center items-center text-pmd-blue-100 min-h-screen font-fontFamily;
//   }
// }

// @layer components {
//   .tw-timer-container {
//     @apply w-[20rem] h-[20rem] flex justify-center items-center rounded-full bg-gradient-to-t to-pmd-blue-600 from-pmd-blue-900  shadow-2xl shadow-pmd-blue-600;
//   }

//   .tw-timer {
//     @apply w-[17rem] h-[17rem] flex justify-center items-center rounded-full text-6xl bg-pmd-blue-900;
//   }

//   .tw-infoContainer {
//     @apply bg-pmd-blue-900 flex justify-between items-center rounded-full p-3 mb-6;
//   }

//   .tw-infoItem {
//     @apply p-3 text-pmd-blue-300 font-semibold rounded-full text-xs flex-1 text-center whitespace-nowrap cursor-pointer;
//   }

//   .tw-infoItem.active {
//     @apply bg-pmd-red-700 text-pmd-blue-800;
//   }
// }

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <FormDataProvider>
//     <App />
//   </FormDataProvider>
// );
