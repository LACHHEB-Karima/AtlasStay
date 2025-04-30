import React from "react";
import { useState } from "react";
import BookinStep1 from "./BookingStep1"
import BookingStep2 from "./BookingStep2";
import BookingStep3 from "./BookingStep3";

const BookingProcess = () => {
    const [step, setStep] = useState(1);
  
    const goToNextStep = () => setStep(step + 1);
  
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6 mt-10">
        {step === 1 && <BookinStep1 onNext={goToNextStep} />}
        {step === 2 && <BookingStep2 onNext={goToNextStep} />}
        {step === 3 && <BookingStep3 />}
      </div>
    );
  };
  
  export default BookingProcess;