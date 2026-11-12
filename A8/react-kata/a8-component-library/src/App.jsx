import { useState } from 'react';
import Button from './components/Button';
import Modal from './components/Modal';
import TextInput from './components/TextInput';
import Select from './components/Select';
import Checkbox from './components/Checkbox';
import './index.css';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="documentation">
      <header>
        <h1>Accessible Component Library</h1>
        <p>Fully keyboard operable components built for React.</p>
      </header>

      <section>
        <h2>Button</h2>
        <p className="desc">Use for actions. Renders a native button with built-in keyboard support.</p>
        <div className="demo-row">
          <Button variant="primary" onClick={() => alert('Clicked')}>Primary Button</Button>
          <Button variant="secondary" onClick={() => alert('Clicked')}>Secondary Button</Button>
          <Button disabled>Disabled Button</Button>
        </div>
      </section>

      <section>
        <h2>Modal Dialog</h2>
        <p className="desc">Use to focus user attention. Traps focus, closes on Escape, and returns focus to the trigger.</p>
        <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Accessible Modal">
          <p>Press Tab and Shift+Tab. Focus will cycle inside this box.</p>
          <TextInput label="Sample Input inside Modal" placeholder="Type here..." />
        </Modal>
      </section>

      <section>
        <h2>Form Fields</h2>
        <p className="desc">Inputs with fully associated labels and screen-reader accessible error states.</p>
        <div className="demo-grid">
          <TextInput label="Default Input" placeholder="John Doe" />
          <TextInput label="Input with Error" error="This field is required" defaultValue="" />
          
          <Select label="Default Select">
            <option>Option 1</option>
            <option>Option 2</option>
          </Select>
          <Select label="Select with Error" error="Please choose an option">
            <option value="">Choose...</option>
          </Select>

          <Checkbox label="Default Checkbox" />
          <Checkbox label="Checkbox with Error" error="You must agree" />
        </div>
      </section>
    </main>
  );
}