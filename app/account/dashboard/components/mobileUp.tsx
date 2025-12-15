import React from 'react';

interface MobProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

const MobileUp: React.FC<MobProps> = ({ currentView, setCurrentView }) => {
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'spend', label: 'Spend' },
   { id: "invest", label: "Invest"},
       { id: 'card', label: 'Card' },
  ];

  return (
    <div className="flex md:hidden justify-center pt-5 items-center">
      <ul className="flex items-center gap-3">
        {menuItems.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            <button
              className={`py-3 px-5 bg-gray-200 rounded-lg font-medium text-lg ${
                currentView === item.id ? 'text-black/90 font-semibold' : 
                ' text-gray-800'
              }`}
              onClick={() => setCurrentView(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileUp;
