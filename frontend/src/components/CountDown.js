import React, { useEffect } from "react";

const CountdownTimer = ({
  expired,
  setExpired,
  seconds,
  setSeconds,
  email,
}) => {
  // 2 minutes in seconds

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        setExpired(true);
        clearInterval(countdown);
        (async () => {
          await fetch("https://taskdailypro.onrender.com/api/auth/SetOtpNull", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
            }),
          });
          console.log("otp set to null");
        })();
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div>
      {expired ? (
        <p>OTP Expired</p>
      ) : (
        <p>Time Remaining: {formatTime(seconds)}</p>
      )}
    </div>
  );
};

export default CountdownTimer;
