import { useState } from "react";

//const [enviado, setEnviado] = useState(false);

function EmailInput({ onClose }) {
  const [email, setEmail] = useState("");

  return (
    <>
      {/* Fundo escuro e desfocado */}
      <div
        className="email-modal-overlay bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Conteúdo da modal */}
      <div className="email-modal-content bg-white p-6 rounded-2xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">
          Insira seu Email para receber o QR
        </h2>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Digite seu Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
            onClick={onClose}
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}
export default EmailInput;
