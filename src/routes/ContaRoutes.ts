import { Router } from "express";
import {
  criarConta,
  listarContas,
  consultarConta,
  consultarSaldo,
  depositar,
  sacar,
  deletarConta
} from "../controllers/contaController";

const router = Router();

router.post("/", criarConta);
router.get("/", listarContas);
router.get("/:numeroConta", consultarConta);
router.get("/:numeroConta/saldo", consultarSaldo);
router.patch("/:numeroConta/deposito", depositar);
router.patch("/:numeroConta/saque", sacar);
router.delete("/:numeroConta/deletar", deletarConta);

export default router;
