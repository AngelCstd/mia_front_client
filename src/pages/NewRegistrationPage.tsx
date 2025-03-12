import React, { useState } from 'react';
import { Building2, Phone, Mail, User, Briefcase, MapPin, Lock, CheckCircle2, ArrowRight, Hotel, Calendar, MapPinOff, ArrowLeft } from 'lucide-react';
import { newRegisterUser } from '../services/authService';

interface RegistrationFormData {
    name: string;
    secondName: string;
    lastname1: string;
    lastname2: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

interface RegistrationPageProps {
    onComplete: () => void;
}

export const NewRegistrationPage: React.FC<RegistrationPageProps> = ({onComplete}) => {
    const [step, setStep] = useState<'personal' | 'completed'>('personal');
    const [formData, setFormData] = useState<RegistrationFormData>({
        name: '',
        secondName: '',
        lastname1: '',
        lastname2: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [passwordError, setPasswordError] = useState('');
    const [registrationError, setRegistrationError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleRegistrationComplete = async () => {
        try {
            if (isRegistering) return;
            setIsRegistering(true);
            setRegistrationError('');

            const result = await newRegisterUser(formData);
            if (result.success) {
                //Aqui se deberia verificar el correo pero por mientras se queda que se logea y ya
                // console.log("revisa correo");
                // setStep('completed');
                onComplete();

            }
        } catch (error: any) {
            console.error('Error during registration:', error);
            setRegistrationError(
                error.message || 'Error al registrar. Por favor intenta de nuevo.'
            );
        } finally {
            setIsRegistering(false);
        }
    };


    const handlePersonalSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password.length < 8) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Las contraseñas no coinciden');
            return;
        }

        handleRegistrationComplete()
        setPasswordError('');
    };


    const renderPersonalForm = () => (
        <form onSubmit={handlePersonalSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre Completo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Segundo Nombre
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            required
                            value={formData.secondName}
                            onChange={(e) => setFormData({ ...formData, secondName: e.target.value })}
                            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Apellido paterno <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            required
                            value={formData.lastname1}
                            onChange={(e) => setFormData({ ...formData, lastname1: e.target.value })}
                            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Apellido materno
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            required
                            value={formData.lastname2}
                            onChange={(e) => setFormData({ ...formData, lastname2: e.target.value })}
                            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Correo Electrónico */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Correo Electrónico <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Teléfono */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Contraseña */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Mínimo 8 caracteres"
                        />
                    </div>
                </div>

                {/* Confirmar Contraseña */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmar Contraseña <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>
            </div>

            {passwordError && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                    {passwordError}
                </div>
            )}

            <div className="flex space-x-4 w-full">
                <button
                    onClick={handlePersonalSubmit}
                    disabled={isRegistering}
                    className={`flex items-center space-x-2 w-full justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ${isRegistering ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {isRegistering ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Registrando...</span>
                        </>
                    ) : (
                        <>
                            <span>Registrarse</span>
                            <CheckCircle2 className="w-5 h-5" />
                        </>
                    )}
                </button>
            </div>
            {registrationError && (
                <div className="mt-4 text-red-300 bg-red-900/50 p-4 rounded-lg">
                    {registrationError}
                </div>
            )}
        </form>
    );

    const renderContent = () => {
        switch (step) {
            case 'personal':
                return (
                    <>
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">Información Personal</h2>
                            <p className="mt-2 text-gray-600">Datos de acceso a tu cuenta</p>
                        </div>
                        {renderPersonalForm()}
                    </>
                );
            case 'completed':
                return (
                    <>
                        <div className='flex flex-col justify-center items-center'>
                            <h1>Registro realizado correctamente</h1>
                            <p>Verifica tu direccion de correo electronico</p>
                            <CheckCircle2/>
                        </div>
                    </>
                )
        }
    };


    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 pt-20">
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="md:grid md:grid-cols-5">
                        {/* Left Panel - Decorative */}
                        <div className="hidden md:block md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 relative">
                            <div className="absolute inset-0 opacity-10 bg-pattern"></div>
                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold text-white mb-6">
                                    Únete a la Experiencia de Viaje
                                </h2>
                                <p className="text-blue-100 mb-8 leading-relaxed">
                                    Descubre un mundo de posibilidades con nuestro asistente inteligente de viajes.
                                </p>
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-3 text-white">
                                        <CheckCircle2 className="w-6 h-6 text-blue-300" />
                                        <span>Reservas personalizadas</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-white">
                                        <CheckCircle2 className="w-6 h-6 text-blue-300" />
                                        <span>Asistencia 24/7</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-white">
                                        <CheckCircle2 className="w-6 h-6 text-blue-300" />
                                        <span>Ofertas exclusivas</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel - Form */}
                        <div className="md:col-span-3 p-8 lg:p-12">
                            <div className="max-w-2xl mx-auto">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};