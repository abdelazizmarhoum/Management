import { useSearchParams, useNavigate } from 'react-router-dom';
import { TAccount } from '../components/TAccount';
import { AlertCircle, FileText } from 'lucide-react';

export function ResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get the 'data' parameter from the URL
  const dataString = searchParams.get('data');

  // If there's no data, show an error message
  if (!dataString) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="bg-white p-8 rounded-2xl shadow-large w-full max-w-lg text-center border border-red-100">
          <div className="mx-auto bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-red-700 font-heading">Aucune Donnée Trouvée</h2>
          <p className="mt-4 text-neutral-700">Impossible de trouver les données de transaction. Veuillez réessayer.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-8 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 shadow-soft"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  // Parse the JSON string from the URL back into an object
  const transactionData = JSON.parse(decodeURIComponent(dataString));

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-neutral-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-xl shadow-soft border border-primary-100">
                <FileText className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary-800 font-heading">Résultat de l'Entrée de Journal</h1>
                <p className="text-neutral-600 mt-1">
                  Pour : <span className="font-medium text-neutral-800">"{transactionData.transactionDescription}"</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-white border border-neutral-200 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-all duration-300 shadow-soft font-medium"
            >
              ← Retour
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              Comptes Affectés
            </div>
            <h2 className="text-2xl font-bold text-neutral-800 font-heading">
              Visualisation des Écritures Comptables
            </h2>
            <p className="text-neutral-600 mt-2 max-w-2xl mx-auto">
              Les comptes suivants ont été modifiés par cette transaction.
            </p>
          </div>

          {/* FIXED T-Accounts Grid - Properly Centered */}
          <div className="relative mb-12">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/20 to-secondary-50/20 rounded-3xl" />
            
            <div className="relative bg-white rounded-2xl border border-neutral-200 shadow-large p-8">
              {/* Dynamic Grid Layout Based on Number of Accounts */}
              <div className="flex justify-center w-full">
                <div className={`w-full ${transactionData.accounts.length <= 2 ? 'max-w-2xl' : 'max-w-6xl'}`}>
                  <div className={`grid gap-8 ${
                    transactionData.accounts.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
                    transactionData.accounts.length === 2 ? 'grid-cols-1 md:grid-cols-2 gap-12' :
                    'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  }`}>
                    {transactionData.accounts.map((account, index) => (
                      <div 
                        key={index} 
                        className={`${
                          transactionData.accounts.length === 1 ? 'w-full flex justify-center' :
                          transactionData.accounts.length === 2 ? 'flex justify-center' :
                          ''
                        }`}
                      >
                        <div className="w-full max-w-sm mx-auto transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                          <div className="relative">
                            {/* Decorative accent */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-t-xl" />
                            <TAccount account={account} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl text-lg font-semibold hover:from-primary-700 hover:to-secondary-700 shadow-soft transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto"
              >
                Nouvelle Transaction
              </button>
            </div>
            <p className="text-neutral-500 text-sm mt-6">
              Toutes les écritures comptables doivent respecter le principe de la partie double.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}