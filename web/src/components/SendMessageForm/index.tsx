import { FormEvent, useState } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { toast } from "react-toastify";

import styles from './styles.module.scss';

import { api } from '../../services/api';
import { useAuth } from '../../contexts/auth';

export function SendMessageForm() {
  const { signOut, user } = useAuth();
  const [message, setMessage] = useState('');

  async function handleSendMessage(event: FormEvent) {
    try {
      event.preventDefault();

      if (!message.trim()) {
        return;
      }

      await api.post('/messages', { message });
      setMessage('');

      toast.success("Mensagem enviada com sucesso!", {
        theme: 'colored',
        icon: false,
      });
    } catch (error) {
      toast.error("Houve um erro ao tentar enviar a mensagem.", {
        theme: 'colored',
        icon: false,
      });
    }
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size="32" />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>

        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
          onChange={event => setMessage(event.target.value)}
          value={message}
        />

        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  );
}
