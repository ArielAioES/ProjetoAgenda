import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register')); //adicionar a rota do backend
    };

    return (
        <div className='RegisterPage'>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="form-field">
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            name="name"
                            value={formData.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            onChange={handleChange}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="form-field">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            className="mt-1 block w-full"
                            autoComplete="email"
                            onChange={handleChange}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="form-field">
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={handleChange}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="form-field">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={handleChange}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4" type="submit">
                            Register
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </div>
    );
}
