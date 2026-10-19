import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import type { Product } from '../../content/products';
import { ButtonLink } from './Button';
import styles from './ProductDialog.module.css';

interface ProductDialogProps {
  product: Product | null;
  onClose: () => void;
}

/** Product brief presented as a modal side sheet (native <dialog>). */
export function ProductDialog({ product, onClose }: ProductDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (product && !dialog.open) {
      dialog.showModal();
      document.documentElement.classList.add('dialog-open');
    }
  }, [product]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => {
      document.documentElement.classList.remove('dialog-open');
      onClose();
    };
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  const close = () => {
    document.documentElement.classList.remove('dialog-open');
    ref.current?.close();
  };

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby="product-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      {product && (
        <div className={styles.sheet}>
          <div className={styles.top}>
            <p className="mono">
              <span className={styles.code}>{product.code}</span> {product.category}
            </p>
            <button type="button" className={styles.close} onClick={close}>
              <X size={20} strokeWidth={1.5} aria-hidden="true" />
              <span className="visually-hidden">Close product brief</span>
            </button>
          </div>

          <h2 id="product-dialog-title" className={`display ${styles.title}`}>
            {product.name}
          </h2>
          <div className={styles.overview}>
            {product.overview.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <dl className={styles.specs}>
            <div>
              <dt className="mono">Key capabilities</dt>
              <dd>
                <ul role="list">
                  {product.capabilities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="mono">Architecture</dt>
              <dd>
                <ul role="list">
                  {product.architecture.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="mono">Deployment</dt>
              <dd>
                <ul role="list">
                  {product.deployment.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          <div className={styles.foot}>
            <p>
              Technical specifications are shared during product briefings and are not published on this
              website.
            </p>
            <ButtonLink href="/#contact" arrow onClick={close}>
              Request product information
            </ButtonLink>
          </div>
        </div>
      )}
    </dialog>
  );
}
