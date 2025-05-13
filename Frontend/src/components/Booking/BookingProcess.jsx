import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import BookingStep1 from "./BookingStep1";
import BookingStep2 from "./BookingStep2";
import BookingStep3 from "./BookingStep3";

const BookingProcess = () => {

  const [step, setStep] = useState(1);
  const location = useLocation();
  const { roomId, roomTitle, roomPrice, roomPhotoUrl } = location.state || {};

  const [bookingInfo, setBookingInfo] = useState(null);

  const goToNextStep = () => setStep((prev) => prev + 1);

  const handleStep1Complete = (info) => {
    setBookingInfo(info);
    goToNextStep();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white">
      {step === 1 && (
        <BookingStep1
          roomId={roomId}
          roomTitle={roomTitle}
          roomPrice={roomPrice}
          roomPhotoUrl={roomPhotoUrl}
          onNext={handleStep1Complete}
        />
      )}
      {step === 2 && bookingInfo && (
        <BookingStep2 bookingInfo={bookingInfo} onNext={goToNextStep} />
      )}
      {step === 3 && <BookingStep3 />}
    </div>
  );
};

export default BookingProcess;
