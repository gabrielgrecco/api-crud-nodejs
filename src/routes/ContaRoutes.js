import express from "express";
import Conta from "../models/Conta.js";

const router = express.Router();

// Criar conta
router.post("/", async (req, res) => {
  const { numeroConta } = req.body;

  try {
    const contaExistente = await Conta.findOne({ numeroConta });

    if (contaExistente) {
      return res.status(400).json({
        erro: "Já existe uma conta cadastrada com este número de conta."
      });
    }

    const conta = await Conta.create(req.body);
    res.status(201).json(conta);

  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

//Consultar todas as contas
router.get("/", async (req, res) => {
  try {
    const contas = await Conta.find();
    res.json(contas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

//Consultar conta especifica
router.get("/:numeroConta", async (req, res) => {
  try {
    const conta = await Conta.findOne({ numeroConta: req.params.numeroConta});

    if (!conta) 
      return res.status(404).json({ erro: "Conta não encontrada com o id: " + req.params.numeroConta });

    res.json(conta);

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

//Consultar saldo
router.get("/:numeroConta/saldo", async (req, res) => {
  try {
    const conta = await Conta.findOne({ numeroConta: req.params.numeroConta });

    if (!conta) 
      return res.status(404).json({ erro: "Conta não encontrada" });

    res.json({ saldo: conta.saldo });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

//Depositar
router.patch("/:numeroConta/deposito", async (req, res) => {
  const { valor } = req.body;

  if (!valor || valor <= 0) {
    return res.status(400).json({ erro: "Valor inválido para depósito" });
  }

  try {
    const conta = await Conta.findOne({ numeroConta: req.params.numeroConta });

    if (!conta) return res.status(404).json({ erro: "Conta não encontrada" });

    conta.saldo += valor;
    await conta.save();

    res.json({
      mensagem: "Depósito realizado com sucesso",
      saldoAtual: conta.saldo
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

//Sacar
router.patch("/:numeroConta/saque", async (req, res) => {
  const { valor } = req.body;

  if (!valor || valor <= 0) {
    return res.status(400).json({ erro: "Valor inválido para saque" });
  }

  try {
    const conta = await Conta.findOne({ numeroConta: req.params.numeroConta });

    if (!conta) 
      return res.status(404).json({ erro: "Conta não encontrada" });

    if (conta.saldo < valor) {
      return res.status(400).json({ erro: "Saldo insuficiente" });
    }

    conta.saldo -= valor;
    await conta.save();

    res.json({
      mensagem: "Saque realizado com sucesso",
      saldoAtual: conta.saldo
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

//Deletar conta
router.delete("/:numeroConta/deletar", async (req, res) => {
  try {
    const conta = await Conta.findOneAndDelete({
      numeroConta: req.params.numeroConta
    });

    if (!conta) 
      return res.status(404).json({ erro: "Conta não encontrada" });

    res.json({ mensagem: "Conta removida com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

export default router;
