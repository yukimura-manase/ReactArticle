import { useState } from "react";
import CustomDialog from "../../components/ui-elements/dialog/CustomDialog";

const DialogTest: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1>Dialog Test</h1>

      {/* Dialog Open Btn */}
      <div>
        <button onClick={() => setIsOpen(true)}>Open</button>
      </div>

      {/* Dialog Component */}
      <CustomDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default DialogTest;
