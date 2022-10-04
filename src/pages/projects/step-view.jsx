import { SimpleLayout } from "@/components/SimpleLayout";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
export default  function StepView(){
  return  <SimpleLayout
  title="stepview"
  intro="一个step-view的简单实现"
>

<Container/>
</SimpleLayout>
}
function Container(){
  let [step,setStep] = useState(1);
  return (
    <div className="flex min-h-screen items-start  pt-40">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white">
        <div className="flex justify-between rounded p-8">
          <Step step={1} currentStep={step} />
          <Step step={2} currentStep={step} />
          <Step step={3} currentStep={step} />
          <Step step={4} currentStep={step} />
        </div>
        <div className="px-8 pb-8">
          <div>
            <div className="mt-2 h-6 w-40 rounded bg-slate-100" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-5/6 rounded bg-slate-100" />
              <div className="h-4 rounded bg-slate-100" />
              <div className="h-4 w-4/6 rounded bg-slate-100" />
            </div>
          </div>

          <div className="mt-10 flex justify-between">
            <button
              onClick={() => setStep(step < 2 ? step : step - 1)}
              className="rounded px-2 py-1 text-slate-400 hover:text-slate-700"
            >
              Back
            </button>
            <button
              onClick={() => setStep(step > 4 ? step : step + 1)}
              className={`${
                step > 4 ? "pointer-events-none opacity-50" : ""
              } bg flex items-center justify-center rounded-full bg-blue-500 py-1.5 px-3.5 font-medium tracking-tight text-white hover:bg-blue-600 active:bg-blue-700`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function  Step({step,currentStep}){
  let status  = currentStep === step?"active":currentStep<step?"inactive":"complete"
  return (
    <motion.div animate={status} initial={status} className="relative">
       <motion.div
        transition={rippleTransition}
        variants={rippleVariants}
        className="absolute inset-0 rounded-full"
      />
    <motion.div
    animate={status}
      variants={{
        active:{
          background:"white",
          borderColor:"#3b82f6",
          color:"#3b82f6"
        },
        inactive:{
          background:"white",
          color:"#94a3b8",
          borderColor:"#e2e8f0"
        },
        complete:{
          background:"#3b82f6",
          color:"#3b82f6",
        }
      }}
      className={` flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold`}
    >
      <div className="flex items-center justify-center">
        <AnimatePresence>
        {status === "complete" ? (
          <CheckIcon className="h-6 w-6 text-white" />
        ) : (
          <motion.span 
          animate={{ opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }} 
          className="absolute">{step}</motion.span>
        )}
        </AnimatePresence>
      </div>
    </motion.div>
    </motion.div>
  );
}
function CheckIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path 
      variants={checkIconVariants}
      transition={checkIconTransition}
      strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
let x = 1;
const t = (v) => x * v;

let checkIconTransition = {
  ease: "easeOut",
  type: "tween",
  delay: t(0.2),
  duration: t(0.3),
};
let checkIconVariants = {
  complete: {
    pathLength: [0, 1],
  },
};
let rippleTransition = {
  duration: t(0.6),
  delay: t(0.2),
  type: "tween",
  ease: "circOut",
};

let rippleVariants = {
  inactive: {
    background: "var(--blue-200)",
  },
  active: {
    background: "var(--blue-200)",
    scale: 1,
    transition: {
      duration: t(0.3),
      type: "tween",
      ease: "circOut",
    },
  },
  complete: {
    background: "var(--blue-200)",
    scale: 1.25,
  },
};