import React, { useState, useEffect, useMemo, useRef } from 'react';
import { NamesWithAmount } from './data/compilingNames';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

const CompilingAnima = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioRef = useRef(null);


  const filteredMessages = useMemo(() => {
    const actions = ['Withdrew', 'Invested', 'Deposited', 'Received'];
    
    return NamesWithAmount
      .filter(({ amount }) => amount > 5000)
      .map(({ name, amount }, index) => {
        const action = actions[index % actions.length];
        const verb = action.toLowerCase();
        
        return {
          id: index,
          name,
          amount,
          action,
          verb,
          text: `${name} ${verb} $${amount.toLocaleString()}`,
          isLargeAmount: amount > 15000, // Trigger confetti for large amounts
          actionColor: action === 'Withdrew' ? 'text-green-600' : 
                      action === 'Invested' ? 'text-blue-600' : 
                      action === 'Deposited' ? 'text-purple-600' : 'text-amber-600',
          actionBg: action === 'Withdrew' ? 'bg-green-100' : 
                   action === 'Invested' ? 'bg-blue-100' : 
                   action === 'Deposited' ? 'bg-purple-100' : 'bg-amber-100'
        };
      });
  }, [NamesWithAmount]);

  useEffect(() => {
    if (filteredMessages.length === 0) return;

    const sequence = () => {
      // Hide current message with flip out
      setIsVisible(false);
      
      // After flip out, change to next message
      setTimeout(() => {
        const nextIndex = currentIndex === filteredMessages.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(nextIndex);
        
        const nextMessage = filteredMessages[nextIndex];
  
        // Show confetti for large amounts
        if (nextMessage.isLargeAmount) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
        
        // Show new message
        setIsVisible(true);
      }, 300); // Match flip animation duration
    };

    const interval = setInterval(sequence, 3000);

    return () => clearInterval(interval);
  }, [filteredMessages, currentIndex]);

  const currentMessage = filteredMessages[currentIndex];

  return (
    <div className="messages-container py-3 bg-blue-300 flex flex-col items-start md:items-center justify-start md:justify-center relative min-h-[100px]">
     

      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={200}
          recycle={false}
          numberOfPieces={50}
          gravity={0.1}
          onConfettiComplete={() => setShowConfetti(false)}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 100 }}
        />
      )}

      

      <AnimatePresence mode="wait">
        {currentMessage && isVisible && (
          <motion.div
            key={currentMessage.id}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.5 
            }}
            className="message px-4 py-3 rounded-lg shadow-md bg-white/90 backdrop-blur-sm border border-gray-200"
          >
            <div className="flex items-center gap-3">
              {/* Action badge */}
              <div className={`px-3 py-1 rounded-full ${currentMessage.actionBg} ${currentMessage.actionColor} font-medium text-sm flex items-center gap-2`}>
                {currentMessage.isLargeAmount && (
                  <Sparkles className="w-3 h-3" />
                )}
                {currentMessage.action}
              </div>
              
              {/* Message text */}
              <div className="text-gray-800">
                <span className="font-semibold">{currentMessage.name}</span>
                {' '}
                <span className="text-gray-600">
                  {currentMessage.verb} the sum of
                </span>
                {' '}
                <span className="font-bold text-lg text-gray-900">
                  ${currentMessage.amount.toLocaleString()}
                </span>
                
                {currentMessage.isLargeAmount && (
                  <span className="ml-2 text-xs px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full animate-pulse">
                    HUGE!
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-2 w-full max-w-md">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 3, ease: "linear" }}
            key={currentIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default CompilingAnima;