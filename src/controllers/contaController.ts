import { Request, Response } from "express";
import Conta from "../models/Conta";

export const criarConta = async (req: Request, res: Response) => {
  const { numeroConta } = req.body;

  try {
    const contaExistente = await Conta.findOne({ numeroConta });

    if (contaExistente) {
      return res.status(400).json({
        erro: "Já existe uma conta cadastrada com este número de conta."
      });
    }

    const conta = await Conta.create(req.body);
    return res.status(201).json(conta);

  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
};

export const listarContas = async (_: Request, res: Response) => {
  try {
    const contas = await Conta.find();
    return res.json(contas);
  } catch (error: any) {
    return res.status(500).json({ erro: error.message });
  }
};

export const consultarConta = async (req: Request, res: Response) => {
  try {
    const conta = await Conta.findOne({
      numeroConta: req.params.numeroConta
    });

    if (!conta) {
      return res.status(404).json({
        erro: "Conta não encontrada com o id: " + req.params.numeroConta
      });
    }

    return res.json(conta);

  } catch (error: any) {
    return res.status(500).json({ erro: error.message });
  }
};

export const consultarSaldo = async (req: Request, res: Response) => {
  try {
    const conta = await Conta.findOne({
      numeroConta: req.params.numeroConta
    });

    if (!conta) {
      return res.status(404).json({ erro: "Conta não encontrada" });
    }

    return res.json({ saldo: conta.saldo });

  } catch (error: any) {
    return res.status(500).json({ erro: error.message });
  }
};

export const depositar = async (req: Request, res: Response) => {
  const { valor } = req.body;

  if (!valor || valor <= 0) {
    return res.status(400).json({ erro: "Valor inválido para depósito" });
  }

  try {
    const conta = await Conta.findOne({
      numeroConta: req.params.numeroConta
    });

    if (!conta) {
      return res.status(404).json({ erro: "Conta não encontrada" });
    }

    conta.saldo += valor;
    await conta.save();

    return res.json({
      mensagem: "Depósito realizado com sucesso",
      saldoAtual: conta.saldo
    });

  } catch (error: any) {
    return res.status(500).json({ erro: error.message });
  }
};

export const sacar = async (req: Request, res: Response) => {
  const { valor } = req.body;

  if (!valor || valor <= 0) {
    return res.status(400).json({ erro: "Valor inválido para saque" });
  }

  try {
    const conta = await Conta.findOne({
      numeroConta: req.params.numeroConta
    });

    if (!conta) {
      return res.status(404).json({ erro: "Conta não encontrada" });
    }

    if (conta.saldo < valor) {
      return res.status(400).json({ erro: "Saldo insuficiente" });
    }

    conta.saldo -= valor;
    await conta.save();

    return res.json({
      mensagem: "Saque realizado com sucesso",
      saldoAtual: conta.saldo
    });

  } catch (error: any) {
    return res.status(500).json({ erro: error.message });
  }
};

export const deletarConta = async (req: Request, res: Response) => {
  try {
    const conta = await Conta.findOneAndDelete({
      numeroConta: req.params.numeroConta
    });

    if (!conta) {
      return res.status(404).json({ erro: "Conta não encontrada" });
    }

    return res.json({ mensagem: "Conta removida com sucesso" });

  } catch (error: any) {
    return res.status(500).json({ erro: error.message });
  }
};