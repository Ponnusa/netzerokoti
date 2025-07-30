import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Zap, 
  Calculator, 
  Download, 
  BarChart3, 
  Lightbulb, 
  MapPin, 
  Users, 
  Calendar,
  Droplets,
  Thermometer,
  Fuel,
  Battery,
  Leaf,
  TrendingUp,
  Info,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const FinishCO2Calculator = () => {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // House & Heating
    houseType: 'detached',
    area: '',
    constructionYear: '',
    residents: '',
    heatingSystem: 'district',
    districtLocation: 'helsinki',
    
    // Water (optional)
    hasWaterMeter: false,
    hotWater: '',
    coldWater: '',
    waterPeriod: 'monthly',
    
    // Electricity
    electricityProvider: 'fortum',
    electricityProduct: 'standard',
    electricityConsumption: '',
    electricityPeriod: 'yearly',
    
    // Display preferences
    displayMode: 'yearly',
    calculationMethod: 'market'
  });
  
  const [results, setResults] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  // Data constants based on PRD specifications
  const energyDemandByYear = {
    1900: 240, 1960: 210, 1980: 180, 2000: 140, 2010: 100, 2019: 70
  };

  const heatingEmissionFactors = {
    electric: 0.12,
    oil: 0.26,
    geothermal: 0.034,
    district: 0.157 // default, overridden by location
  };

  const districtHeatingFactors = {
    espoo: 0.08764,
    helsinki: 0.12641,
    vantaa: 0.15371,
    tampere: 0.08280,
    other: 0.157
  };

  const electricityEmissionFactors = {
    fortum: { standard: 0.01394, renewable: 0, nuclear: 0.0125 },