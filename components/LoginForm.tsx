import { StyleSheet, TextInput} from 'react-native'
import {  Button, Text } from 'react-native-paper'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useSession} from '@/contexts/AuthContext'
export default function LoginForm() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('')

    const {signIn} = useSession();

    const handleChange = (value:string, id:string) => {
        setForm(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handlePress = async () => {
        console.log("clicked")

        try {
            const response = await axios.post('https://ajs-ca-notebooks.vercel.app/api/users/login', {
            email: form.email,
            password: form.password
        })
            console.log(response.data)
            signIn(response.data.token)
        } catch (e:any) {
            console.log(e);
            setError(e.response.data.message)
        }
    }
    

    return (
        <>
            <TextInput
                style={styles.input}
                placeholder='Email'
                value={form.email}
                onChangeText={(value) => handleChange(value, 'email')}
                id='email'
            />

            <TextInput
                style={styles.input}
                placeholder='Password'
                value={form.password}
                onChangeText={(value) => handleChange(value, 'password')}
                id='password'
            />

            <Text>{error}</Text>

            <Button 
                mode="contained"
                onPress={handlePress}
                loading={false}
                accessibilityLabel='Submit'
            >
                Submit
            </Button>
        </>
    )   
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10
    }
})
