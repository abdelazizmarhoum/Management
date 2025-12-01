import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Calculator } from 'lucide-react';

export function InputPage() {
  // State to hold the text from the input field
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (description.trim() === '') {
      alert('Veuillez saisir une description de transaction.');
      return;
    }
    
    // Navigate to the processing page, passing the description in the URL
    // encodeURIComponent makes sure special characters in the text don't break the URL
    navigate(`/processing?text=${encodeURIComponent(description)}`);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="bg-white p-8 rounded-2xl shadow-large w-full max-w-2xl border border-neutral-200">
        <div className="text-center mb-8">
          <div className="mx-auto bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Calculator className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-center text-primary-700 mb-2 font-heading">
            Assistant Comptable Intelligent
          </h1>
          <p className="text-center text-neutral-600 mb-6 max-w-md mx-auto">
            Entrez une description de transaction en français pour générer une entrée de journal.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-2">
              Description de la Transaction
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-neutral-400" />
              </div>
              <textarea
                id="description"
                className="block w-full pl-10 pr-3 py-4 bg-neutral-50 border border-neutral-200 rounded-xl shadow-soft focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all duration-200 text-neutral-700 placeholder-neutral-500"
                rows="5"
                placeholder="Exemple : Achat de mobilier de magasin payé par chèque, 2486 DH"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-soft text-base font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Générer les T-Comptes
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-neutral-200">
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Exemples de transactions :</h3>
          <ul className="text-sm text-neutral-600 space-y-1">
            <li className="flex items-start">
              <span className="text-primary-500 mr-2">•</span>
              <span>Paiement de la facture d'électricité de 1500 DH en espèces</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-500 mr-2">•</span>
              <span>Vente de marchandises à crédit pour 5000 DH</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-500 mr-2">•</span>
              <span>Achat de fournitures de bureau pour 800 DH à crédit</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}