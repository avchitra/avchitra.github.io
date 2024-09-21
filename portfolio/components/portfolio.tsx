'use client'

import { useState, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Linkedin, Mail, Github } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Medusae() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [tentacles] = useState(() => 
    new Array(20).fill(null).map(() => ({
      position: new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize().multiplyScalar(1 + Math.random()),
      speed: Math.random() * 0.01 + 0.005
    }))
  )

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      tentacles.forEach((tentacle, i) => {
        const vertex = meshRef.current!.geometry.attributes.position.array as Float32Array
        const idx = i * 3
        vertex[idx] = Math.sin(state.clock.elapsedTime * tentacle.speed) * tentacle.position.x
        vertex[idx + 1] = Math.cos(state.clock.elapsedTime * tentacle.speed) * tentacle.position.y
        vertex[idx + 2] = Math.sin(state.clock.elapsedTime * tentacle.speed) * tentacle.position.z
      })
      meshRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const geometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), [])

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <MeshDistortMaterial
        color="#4FD1C5"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0}
      />
    </mesh>
  )
}

export function PortfolioComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100 font-[var(--font-jetbrains-mono)]">
      <div className="fixed inset-0 z-0">
        <Canvas>
          <ambientLight intensity={0.5} />
          <Medusae />
        </Canvas>
      </div>
      <div className="relative z-10">
        <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900 bg-opacity-90 backdrop-blur-sm">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-teal-400">Anish Chitra</h1>
            <div className="hidden md:flex space-x-4">
              <a href="#about" className="hover:text-teal-400 transition-colors">About</a>
              <a href="#showcase" className="hover:text-teal-400 transition-colors">Showcase</a>
              <a href="#contact" className="hover:text-teal-400 transition-colors">Contact</a>
            </div>
            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </nav>
        </header>

        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeIn}
            className="fixed inset-0 z-40 bg-slate-900 bg-opacity-95"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <a href="#about" className="text-2xl hover:text-teal-400 transition-colors" onClick={toggleMenu}>About</a>
              <a href="#showcase" className="text-2xl hover:text-teal-400 transition-colors" onClick={toggleMenu}>Showcase</a>
              <a href="#contact" className="text-2xl hover:text-teal-400 transition-colors" onClick={toggleMenu}>Contact</a>
            </div>
          </motion.div>
        )}

        <main className="container mx-auto px-4 pt-20">
          <motion.section
            id="about"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="min-h-screen flex items-center"
          >
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold mb-4 text-teal-400">About Me</h2>
              <p className="text-lg mb-4 bg-slate-800 bg-opacity-50 p-4 rounded-lg">
                Hello! I'm Anish Chitra, a passionate student with a keen interest in research and computer science. 
                I'm dedicated to expanding my knowledge through self-study and academic pursuits.
              </p>
              <p className="text-lg bg-slate-800 bg-opacity-50 p-4 rounded-lg">
                My journey in computer science is driven by curiosity and a desire to contribute to the field. 
                I'm constantly exploring new technologies and concepts, eager to apply my learning to real-world problems.
              </p>
            </div>
          </motion.section>

          <motion.section
            id="showcase"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="py-20"
          >
            <h2 className="text-4xl font-bold mb-8 text-teal-400">Showcase</h2>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-slate-800 bg-opacity-50 rounded-lg shadow-lg overflow-hidden p-8 text-center"
            >
              <h3 className="text-3xl font-semibold mb-4 text-teal-400">Coming Soon</h3>
              <p className="text-xl text-gray-300">Exciting projects are in the works. Stay tuned!</p>
            </motion.div>
          </motion.section>

          <motion.section
            id="contact"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="min-h-screen flex items-center"
          >
            <div className="w-full max-w-2xl">
              <h2 className="text-4xl font-bold mb-8 text-teal-400">Contact Me</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-md border border-slate-600 bg-slate-800 bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-md border border-slate-600 bg-slate-800 bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 rounded-md border border-slate-600 bg-slate-800 bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-teal-500 text-white px-6 py-2 rounded-md transition-colors hover:bg-teal-600"
                >
                  Send Message
                </motion.button>
              </form>
              <div className="mt-8 flex justify-center space-x-4">
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                  <Github size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </motion.section>
        </main>

        <footer className="bg-slate-900 bg-opacity-90 py-4 mt-20">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>&copy; 2023 Anish Chitra. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}