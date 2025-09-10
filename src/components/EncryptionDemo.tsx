export const EncryptionDemo = () => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted/30 rounded font-mono text-sm">
        Original: Tourist location data
      </div>
      <div className="text-center">↓ AES-256 Encryption ↓</div>
      <div className="p-4 bg-safe/10 rounded font-mono text-sm">
        Encrypted: 3aB9$mK2#vL8@qR5...
      </div>
    </div>
  );
};