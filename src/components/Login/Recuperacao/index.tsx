import React, { useState,useContext } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import CheckboxComponent from "../../Common/Checkbox";
import { CustomButton } from "../../Common/Button";
import { Input } from "../../Common/Input/Input";
import { apiurl } from "../../../Helpers/ApiUrl";
import { GlobalContext } from "../../../Context/GlobalProvider";

export const RecuperarSenha = ({ navigation }: any) => {
    const LogoImagem = 'data:image/png;base64,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'
    const [isCheckedEmail, setIsCheckedEmail] = useState(false);
    const [isCheckedSenha, setIsCheckedSenha] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState<null | string>(null);
    const context = useContext(GlobalContext);
    const token = context?.token || "";

    function handleCheckboxChange(checkboxName: string) {
        if (checkboxName === "Email") {
            setIsCheckedEmail(true);
            setIsCheckedSenha(false);
        } else if (checkboxName === "SMS") {
            setIsCheckedEmail(false);
            setIsCheckedSenha(true);
        }
    }

    function enviarCod() {
        var url = isCheckedEmail ? "/notEmail" : "/notSms"
        var value = isCheckedEmail ? { email: email } : { telefone1: email }
        console.log(1)
        fetch(apiurl + "/user" + url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(value)
        })
            .then((resposta) => resposta.json())
            .then((data) => {

                if (data.error) {
                    if (typeof data.error == "object") {
                        setError("Error ao enviar código.")
                    } else {
                        setError(data.error)
                    }


                } else {
                    setError(null)
                    navigation.navigate("Enviar Código", { isEmail: isCheckedEmail, value: email })
                }
                console.log(data)

            })

    }
    return (
        <View style={{ backgroundColor: 'white', height: '75%', width: '100%' }}>
            <View style={styles.background} >
                <Image style={{ width: 200, height: 100 }} source={{ uri: LogoImagem }} />
            </View>
            <View style={styles.container}>
                <CheckboxComponent value={isCheckedEmail} setValue={setIsCheckedEmail} onChange={() => handleCheckboxChange("Email")} label="Email" />
                <CheckboxComponent value={isCheckedSenha} setValue={setIsCheckedSenha} onChange={() => handleCheckboxChange("SMS")} label="SMS" />
            </View>
            <View style={styles.botao}>
                {isCheckedEmail || isCheckedSenha ?
                    <>
                        <View style={{ marginTop: -140 }} >
                            <Input onChangeText={setEmail} value={email} placeholder="Insira seu email/telefone" />
                        </View>
                        {error ?
                            <View style={styles.errorMessageContainer} >
                                <Text style={styles.errorMessage}>{error}</Text>
                            </View> : null
                        }
                        <View style={{ height: 50 }}>
                            <CustomButton color='#5f781f' color2="#94C021" corTexto="white" title="Enviar" onPress={enviarCod} />
                        </View>
                    </>
                    :
                    ''
                }
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: 'row',
        marginTop: -300,
        marginBottom: 350,
        marginHorizontal: 90,
    },
    background: {
        flex: 1,
        height: '25%',
        alignItems: "center",
        justifyContent: "center",
        marginTop: -350
    },
    botao: {
        height: 50,
        marginTop: -210,
    },
    errorMessageContainer: {
        borderColor: '#94C021',
        borderStyle: 'solid',
        display: 'flex',
        alignItems: "center",
        padding: 5
    },
    errorMessage: {
        color: "red"
    }
});
