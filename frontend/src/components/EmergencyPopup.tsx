import { AlertTriangle } from "lucide-react";
import React from "react";

interface IEmergencyPopUp {
  setAckChecked: (checked: boolean) => void;
}
const EmergencyPopUp: React.FC<IEmergencyPopUp> = ({ setAckChecked }) => {
  return (
    <div className="mx-6 mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 animate-in slide-in-from-top-2 duration-300">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-red-800 mb-2">
            Emergency Keywords Detected
          </h3>
          <p className="text-sm text-red-700 leading-relaxed mb-3">
            Your input contains keywords that may indicate a medical emergency.
            This AI assistant is not designed for emergency situations.
          </p>
          <div className="flex items-start space-x-3 mb-4">
            <input
              type="checkbox"
              id="emergency-acknowledge-inline"
              className="mt-1 w-4 h-4 text-red-600 border-red-300 rounded focus:ring-red-500"
              onChange={(e) => {
                setAckChecked(e.target.checked);
              }}
            />
            <label
              htmlFor="emergency-acknowledge-inline"
              className="text-sm text-red-800 font-medium"
            >
              I acknowledge this is a high-risk situation and understand I
              should seek immediate medical attention if this is an emergency.
            </label>
          </div>
          <div className="flex justify-end space-x-3"></div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPopUp;
