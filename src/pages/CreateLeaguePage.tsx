import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

/** CreateLeaguePage: Multi-step form for creating a new league
 *
 * State:
 * - currentStep: Current step in the form (1, 2, or 3)
 * - formData: Object containing all form data
 *
 * Props: None
 */

interface LeagueFormData {
  // Step 1
  leagueName: string;
  subtitle: string;
  imageUrl: string;

  // Step 2
  location: string;
  dayOfWeek: string;
  time: string;
  frequency: string;
  startDate: string;
  endDate: string;

  // Step 3
  description: string;
}

const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const FREQUENCY_OPTIONS = [
  'Weekly',
  'Bi-weekly',
  'Monthly',
  'Custom'
];

function CreateLeaguePage() {
  const { user } = useContext(UserContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<LeagueFormData>({
    leagueName: '',
    subtitle: '',
    imageUrl: '',
    location: '',
    dayOfWeek: '',
    time: '',
    frequency: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const updateFormData = (field: keyof LeagueFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('League form submitted:', formData);
    // TODO: Submit to backend API
    alert('League created successfully! (This is a demo - backend integration needed)');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Create League</h1>
            <p className="text-lg text-gray-600 mb-8">Please sign in to create a league.</p>
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New League</h1>
              <p className="text-lg text-gray-600">Set up your basketball league in a few simple steps</p>
            </div>
            <Link
              to="/basketball/your-leagues"
              className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Leagues
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    currentStep > step ? 'bg-orange-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && <Step1 formData={formData} updateFormData={updateFormData} />}
            {currentStep === 2 && <Step2 formData={formData} updateFormData={updateFormData} />}
            {currentStep === 3 && <Step3 formData={formData} updateFormData={updateFormData} />}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors duration-200"
                >
                  Create League
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/** Step 1: Basic Information */
function Step1({ formData, updateFormData }: { formData: LeagueFormData, updateFormData: (field: keyof LeagueFormData, value: string) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="leagueName" className="block text-sm font-medium text-gray-700 mb-2">
            League Name *
          </label>
          <input
            type="text"
            id="leagueName"
            value={formData.leagueName}
            onChange={(e) => updateFormData('leagueName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter league name"
            required
          />
        </div>

        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
            Subtitle
          </label>
          <input
            type="text"
            id="subtitle"
            value={formData.subtitle}
            onChange={(e) => updateFormData('subtitle', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter a catchy subtitle"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={(e) => updateFormData('imageUrl', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="https://example.com/league-image.jpg"
          />
          <p className="mt-1 text-sm text-gray-500">Optional: Add a league logo or banner image</p>
        </div>
      </div>
    </div>
  );
}

/** Step 2: Schedule & Location */
function Step2({ formData, updateFormData }: { formData: LeagueFormData, updateFormData: (field: keyof LeagueFormData, value: string) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule & Location</h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={(e) => updateFormData('location', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter court or venue name"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="dayOfWeek" className="block text-sm font-medium text-gray-700 mb-2">
              Day of Week *
            </label>
            <select
              id="dayOfWeek"
              value={formData.dayOfWeek}
              onChange={(e) => updateFormData('dayOfWeek', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            >
              <option value="">Select a day</option>
              {DAYS_OF_WEEK.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
              Time *
            </label>
            <input
              type="time"
              id="time"
              value={formData.time}
              onChange={(e) => updateFormData('time', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-2">
            Frequency *
          </label>
          <select
            id="frequency"
            value={formData.frequency}
            onChange={(e) => updateFormData('frequency', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          >
            <option value="">Select frequency</option>
            {FREQUENCY_OPTIONS.map(freq => (
              <option key={freq} value={freq}>{freq}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
              Start Date *
            </label>
            <input
              type="date"
              id="startDate"
              value={formData.startDate}
              onChange={(e) => updateFormData('startDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
              End Date *
            </label>
            <input
              type="date"
              id="endDate"
              value={formData.endDate}
              onChange={(e) => updateFormData('endDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Step 3: Description */
function Step3({ formData, updateFormData }: { formData: LeagueFormData, updateFormData: (field: keyof LeagueFormData, value: string) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            League Description *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Describe your league, rules, skill level, and what players can expect..."
            required
          />
          <p className="mt-1 text-sm text-gray-500">Tell potential players about your league and what makes it special</p>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">League Summary</h3>
          <div className="space-y-2 text-sm">
            <div><span className="font-medium">Name:</span> {formData.leagueName || 'Not specified'}</div>
            <div><span className="font-medium">Location:</span> {formData.location || 'Not specified'}</div>
            <div><span className="font-medium">Schedule:</span> {formData.dayOfWeek && formData.time ? `${formData.dayOfWeek}s at ${formData.time}` : 'Not specified'}</div>
            <div><span className="font-medium">Frequency:</span> {formData.frequency || 'Not specified'}</div>
            <div><span className="font-medium">Duration:</span> {formData.startDate && formData.endDate ? `${formData.startDate} to ${formData.endDate}` : 'Not specified'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateLeaguePage;
