import styles from './FormGroup.module.css';

function FormGroup({ label, type, name, value, handleChange, error }) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}*</label>
      <input
        className={styles.input}
        type={type}
        name={name}
        required
        value={value}
        onChange={handleChange}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default FormGroup;
